/*
Register Tokens on the target chain from wormhole UI before transferring tokens
https://wormhole-foundation.github.io/example-token-bridge-ui/#/register
Run this script in Source testnet by :
npx hardhat run .\scripts\Wormhole\UniversalBridge\Bridge1.ts --network <source chain>
*/

import { getEmitterAddressEth, parseSequenceFromLogEth, tryNativeToHexString } from "@certusone/wormhole-sdk";
import { BigNumber } from 'ethers';
import { utils } from 'ethers';

const hre = require("hardhat");
const {ethers} = require("hardhat");
const fs = require('fs');
const { writeFileSync } = require("fs");
const { readFileSync } = require("fs");
const path = require('path');
const AddressBook = require("../BridgeAddresses.json");
const ChainIDBook = require("../ChainIDWormhole.json");
const txReceipt = require("../UniversalBridge/txReceiptfile.json");
const RPCURL = require("../RPC.json");
const newABI = require("../ABI/tokenBridgeABI.json");



const bytes32FromAddress = (address:any) => {
  // let bytes32 = web3.utils.padLeft(web3.utils.hexToBytes(address), 32);
  // let bytes32 = ethers.utils.formatBytes32String(address);
  let bytes32 = ethers.utils.hexZeroPad(address,32);
  console.log("bytes32 recipient address:",bytes32);
  return bytes32;
}
