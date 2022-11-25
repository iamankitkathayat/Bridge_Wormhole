require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();
require('@nomicfoundation/hardhat-toolbox');
require("@nomicfoundation/hardhat-chai-matchers");
const { task } = require("hardhat/config");
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
const RPCURL = require("../metatronprotocol/scripts/Wormhole/RPC.json");


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    hardhat: {},


    goerli: {
      // url: 'https://goerli.infura.io/v3/680f182649ca427a8fff593b93f71fac',
      url: RPCURL.RPCurl.goerli,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5,
    },

    mumbai: {
      // url: `https://matic-mumbai.chainstacklabs.com`,
      url: RPCURL.RPCurl.mumbai,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80001,
    },

    fuji: {
      // url: `https://api.avax-test.network/ext/bc/C/rpc`,
      url: RPCURL.RPCurl.fuji,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 43113,
    },

    bsc: {
      // url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      url: RPCURL.RPCurl.bsc,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: [process.env.ETHERSCAN_API_KEY]
  }
};
