const params = {
  LAST_POW_BLOCK: 182700, // 345600
  RAMP_TO_BLOCK: 960,
  LAST_SEESAW_BLOCK: 200000
};

const avgBlockTime = 60; // 1.5 minutes (90 seconds)

const blocksPerDay = (24 * 60 * 60) / avgBlockTime; // 960

const blocksPerWeek = blocksPerDay * 7; // 6720

const blocksPerMonth = (blocksPerDay * 365.25) / 12; // 29220

const blocksPerYear = blocksPerDay * 365.25; // 350640

const mncoins = 1000.0;

const getMNBlocksPerDay = (mns) => {
  return blocksPerDay / mns;
};

const getMNBlocksPerWeek = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 52);
};

const getMNBlocksPerMonth = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 12);
};

const getMNBlocksPerYear = (mns) => {
  return getMNBlocksPerDay(mns) * 365.25;
};

const getMNSubsidy = (nHeight = 0, nMasternodeCount = 0, nMoneySupply = 0) => {
  const blockValue = getSubsidy(nHeight);
  let ret = blockValue * 0.6;

  return ret;
};

const getSubsidy = (nHeight = 1) => {
  let nSubsidy = 0.0;
  const halvingInterval = 518400;

  if (nHeight <= 3) {
    nSubsidy = 350400;
  } else if (nHeight >= 3154101) {
    nSubsidy = 0;
  } else if (nHeight <= 300) {
    nSubsidy = 1;
  } else if (nHeight <= halvingInterval && nHeight > 300) {
    nSubsidy = 20;
  } else if (nHeight <= halvingInterval * 2 && nHeight > halvingInterval) {
    nSubsidy = 10;
  } else if (nHeight <= halvingInterval * 3 && nHeight > halvingInterval * 2) {
    nSubsidy = 5;
  } else if (nHeight <= halvingInterval * 4 && nHeight > halvingInterval * 3) {
    nSubsidy = 2.5;
  } else if (nHeight <= halvingInterval * 5 && nHeight > halvingInterval * 4) {
    nSubsidy = 1.25;
  }

  return nSubsidy;
};

const getROI = (subsidy, mns) => {
  return ((getMNBlocksPerYear(mns) * subsidy) / mncoins) * 100.0;
};

const isAddress = (s) => {
  return typeof(s) === 'string' && s.length === 34;
};

const isBlock = (s) => {
  return !isNaN(s) || (typeof(s) === 'string');
};

const isPoS = (b) => {
  return false
};

const isTX = (s) => {
  return typeof(s) === 'string' && s.length === 64;
};

module.exports = {
  avgBlockTime,
  blocksPerDay,
  blocksPerMonth,
  blocksPerWeek,
  blocksPerYear,
  mncoins,
  params,
  getMNBlocksPerDay,
  getMNBlocksPerMonth,
  getMNBlocksPerWeek,
  getMNBlocksPerYear,
  getMNSubsidy,
  getSubsidy,
  getROI,
  isAddress,
  isBlock,
  isPoS,
  isTX
};
