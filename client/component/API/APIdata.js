const APIdata = [
  {
    heading: 'API Calls',
    subHeading: 'Return data from coind',
    calls: [
        {
          name: 'getAddress [hash]',
          info: 'Returns information for given address.',
          path: '/api/address/MWE3wokLW9VuUM6bYs9ADJoZ29Y4XKV9iw'
        },
        {
          name: 'getBlock [hash] [height]',
          info: 'Returns block information for the given hash or height.',
          path: '/api/block/0000000000041800795180b0a181184408ad89a4016d81d240d48bb78acfa88a'
        },
        {
          name: 'getBlockAverage',
          info: 'Returns the average block time over 24 hours.',
          path: '/api/block/average'
        },
        {
          name: 'getCoin',
          info: 'Returns coin information.',
          path: '/api/coin/'
        },
        {
          name: 'getCoinHistory',
          info: 'Returns the coin history.',
          path: '/api/coin/history'
        },
        {
          name: 'getMasternodes',
          info: 'Returns masternode information.',
          path: '/api/masternode'
        },
        {
          name: 'getMasternodeByAddress',
          info: 'Returns masternode information by Wallet Address.',
          path: '/api/masternode/M8tJg1AJ8jQk9LS4qemxmhBnGZVUqe7Aq2'
        },
        {
          name: 'getMasternodeCount',
          info: 'Returns masternodes enabled and total counts.',
          path: '/api/masternodecount'
        },
        {
          name: 'getMasternodeAverage',
          info: 'Returns the average payment for a masternode vs 24 hours.',
          path: '/api/masternode/average'
        },
        {
          name: 'getPeer',
          info: 'Returns peer information.',
          path: '/api/peer'
        },
        {
          name: 'getSupply',
          info: 'Returns circulating and total supply information.<br />https://github.com/coincheckup/crypto-supplies',
          path: '/api/supply'
        },
        {
          name: 'getTop100',
          info: 'Returns top 100',
          path: '/api/top100'
        },
        {
          name: 'getTXs',
          info: 'Returns transaction information.',
          path: '/api/tx'
        },
        {
          name: 'getTXLatest',
          info: 'Returns latest transaction information.',
          path: '/api/tx/latest'
        },
        {
          name: 'getTX [hash]',
          info: 'Returns information for the given transaction.',
          path: '/api/tx/121b8c622c23a550b66d13c819a035e70eec1cd79818ba03c3c20e50f1838738'
        },
        {
          name: 'getDifficulty',
          info: 'Returns the current difficulty.',
          path: '/api/getdifficulty'
        },
        {
          name: 'getConnectionCount',
          info: 'Returns the number of connections the block explorer has to other nodes.',
          path: '/api/getconnectioncount'
        },
        {
          name: 'getBlockCount',
          info: 'Returns the current block index.',
          path: '/api/getblockcount'
        },
        {
          name: 'getNetworkHashPS',
          info: 'Returns the current network hashrate. (hash/s)',
          path: '/api/getnetworkhashps'
        },
    ]
  },
  {
    heading: 'Extended API',
    subHeading: 'Return data from local indexes',
    calls: [
        {
          name: 'getMoneySupply',
          info: 'Returns the current money supply.',
          path: '/ext/getmoneysupply'
        },
        // { name: 'getdistribution',
        //   info: 'Returns the number of connections the block explorer has to other nodes.',
        //   path: '/ext/getdistribution'
        // },
        {
          name: 'getAddress',
          info: 'Returns address information.',
          path: '/ext/getaddress'
        },
        {
          name: 'getBalance',
          info: 'Returns the current balance.',
          path: '/ext/getbalance'
        },
        {
          name: 'getLastTXs',
          info: 'Returns the last transactions.',
          path: '/ext/getlasttxs'
        }
    ]
  },
  {
    heading: 'Linking (GET)',
    subHeading: 'Linking to the block explorer',
    calls: [
        {
          name: 'Transaction (/#/tx/[hash])',
          info: 'Returns transaction information',
          path: '/#/tx/121b8c622c23a550b66d13c819a035e70eec1cd79818ba03c3c20e50f1838738'
        },
        {
          name: 'Block (/#/block/[hash|height]',
          info: 'Returns block information.',
          path: '/#/block/0000000000041800795180b0a181184408ad89a4016d81d240d48bb78acfa88a'
        },
        {
          name: 'Address (/#/address/[hash]',
          info: 'Returns address information.',
          path: '/#/address/MGEgU5asbAQ83AUhQjMxmw6bcXnq3aEm6y'
        },
        // { name: 'qr (qr/[hash]',
        //   info: 'Returns qr code information.',
        //   path: '/#/qr/000000000001eb792fe1ac3f901d2373509769f5179d9fe2fd3bf8cb3b6ebec9'
        // },
    ]
  }
]

export default APIdata;
