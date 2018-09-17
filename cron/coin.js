
require('babel-polyfill');
const config = require('../config');
const { exit, rpc } = require('../lib/cron');
const fetch = require('../lib/fetch');
const locker = require('../lib/locker');
const moment = require('moment');
// Models.
const Coin = require('../model/coin');

/**
 * Get the coin related information including things
 * like price coingecko.com data.
 */
async function syncCoin() {
  const date = moment().utc().startOf('minute').toDate();
  // Setup the coingecko.com api url.
  const url = `${ config.coinGecko.api }${ config.coinGecko.name }`;

  const info = await rpc.call('getinfo');
  const masternodes = await rpc.call('masternode', ['count']);
  const masternodesCount = {
    total: masternodes.length,
    stable: 0,
  };
  for (let i = 0; i < masternodes.length; i += 1) {
    if (masternodes[i] === 'ENABLED' || masternodes[i] === 'WATCHDOG_ENABLED') {
      masternodesCount.stable += 1;
    }
  }
  const nethashps = await rpc.call('getnetworkhashps');

  let market = await fetch(url);
  if (Array.isArray(market)) {
    market = market.length ? market[0] : {};
  }

  const coin = new Coin({
    cap: market.market_data.market_cap.usd,
    createdAt: date,
    blocks: info.blocks,
    btc: market.market_data.current_price.btc,
    diff: info.difficulty,
    mnsOff: masternodes.total - masternodes.enabled,
    mnsOn: masternodes.enabled,
    netHash: nethashps,
    peers: info.connections,
    status: 'Online',
    supply: market.market_data.circulating_supply, // TODO: change to actual count from db.
    usd: market.market_data.current_price.usd
  });

  await coin.save();
}

/**
 * Handle locking.
 */
async function update() {
  const type = 'coin';
  let code = 0;

  try {
    locker.lock(type);
    await syncCoin();
  } catch(err) {
    console.log(err);
    code = 1;
  } finally {
    try {
      locker.unlock(type);
    } catch(err) {
      console.log(err);
      code = 1;
    }
    exit(code);
  }
}

update();
