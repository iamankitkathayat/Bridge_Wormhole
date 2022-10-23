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
