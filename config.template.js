
/**
 * Global configuration object.
 */
const config = {
  'api': {
    'host': 'https://explorer.parkingcrypto.org',
    'port': '443',
    'prefix': '/api',
    'timeout': '5s'
  },
  'listen': {
    'host': 'http://localhost',
    'port': '3000',
  },
  'coinGecko': {
    'api': 'https://api.coingecko.com/api/v3/coins/',
    'name': 'motion'
  },
  'db': {
    'host': '127.0.0.1',
    'port': '27017',
    'name': 'blockex',
    'user': 'blockexuser',
    'pass': 'Explorer!1'
  },
  'freegeoip': {
    'api': 'https://extreme-ip-lookup.com/json/'
  },
  'rpc': {
    'host': '127.0.0.1',
    'port': '47774',
    'user': 'parkingcoinrpc',
    'pass': 'someverysafepassword',
    'timeout': 8000, // 8 seconds
  }
};

module.exports = config;
