
require('babel-polyfill');
require('../lib/cron');
const config = require('../config');
const { exit, rpc } = require('../lib/cron');
const fetch = require('../lib/fetch');
const { forEach } = require('p-iteration');
const locker = require('../lib/locker');
const moment = require('moment');
// Models.
const Masternode = require('../model/masternode');

/**
 * Get a list of the mns and request IP information
 * from freegeopip.net.
 */
async function syncMasternode() {
  const date = moment().utc().startOf('minute').toDate();

  await Masternode.remove({});

  // Increase the timeout for masternode.
  rpc.timeout(10000); // 10 secs

  const mnsinfo = await rpc.call('masternodelist', ['info']);
  const mnslastpaidtime = await rpc.call('masternodelist', ['lastpaidtime']);
  const inserts = [];
  const mns = [];

  for (const mn in mnsinfo) {
    const info = mnsinfo[mn].split(' ')
      .filter(values => { if (values !== '') { return mn; } });

    mns.push({
      status: info[0],
      protocol: info[1],
      payee: info[2],
      lastseen: info[3],
      activeseconds: info[4],
      sentinelversion: info[5],
      sentinelstate: info[6],
      ip: info[7],
      lastpaid: mnslastpaidtime[mn],
      txhash: mn.split('-')[0],
      outidx: mn.split('-')[1],
    });
  }

  await forEach(mns, async (mn) => {
    const masternode = new Masternode({
      active: mn.activeseconds,
      addr: mn.payee,
      createdAt: date,
      lastAt: new Date(mn.lastseen * 1000),
      lastPaidAt: new Date(mn.lastpaid * 1000),
      sentinelVersion: mn.sentinelversion,
      sentinelState: mn.sentinelstate,
      status: mn.status,
      txHash: mn.txhash,
      txOutIdx: mn.outidx,
      ver: mn.protocol,
      ip: mn.ip,
    });

    inserts.push(masternode);
  });

  if (inserts.length) {
    await Masternode.insertMany(inserts);
  }
}

/**
 * Handle locking.
 */
async function update() {
  const type = 'masternode';
  let code = 0;

  try {
    locker.lock(type);
    await syncMasternode();
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
