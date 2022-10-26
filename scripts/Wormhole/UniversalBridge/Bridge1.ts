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

const bridgeTransfer = async (
      sourceChain:any, 
      targetChain:any, 
      approveAmt:any,
      transferAmt:any, 
      recipientAddress:any,
      nonce:any
      ) => {

        const signers = await ethers.getSigners();
        const signer = signers[0];


          const KingJames = await ethers.getContractFactory("KingJames");
          

          let bridgeSource;
          let sourceBridgeAddress;
          let token;
          let tokenAddress;
          let chainID;
          let sourceRPCurl;
          let provider;

          if(sourceChain == "Goerli"){
            token = await Enoch1.attach(AddressBook.tokenAddresses.goerli);
            tokenAddress = AddressBook.tokenAddresses.goerli;
            sourceRPCurl = RPCURL.RPCurl.goerli;
            provider = new ethers.providers.JsonRpcProvider(sourceRPCurl);
            bridgeSource = await new ethers.Contract(AddressBook.tokenBridgeAddresses.goerliBridgeAddress, newABI, provider);
            sourceBridgeAddress = AddressBook.tokenBridgeAddresses.goerliBridgeAddress;
          }
          else if(sourceChain == "Mumbai"){
            token = await Enoch1.attach(AddressBook.tokenAddresses.mumbai);
            tokenAddress = AddressBook.tokenAddresses.mumbai;
            sourceRPCurl = RPCURL.RPCurl.mumbai;
            provider = new ethers.providers.JsonRpcProvider(sourceRPCurl);
            bridgeSource = await new ethers.Contract(AddressBook.tokenBridgeAddresses.mumbaiBridgeAddress, newABI, provider);
            sourceBridgeAddress = AddressBook.tokenBridgeAddresses.mumbaiBridgeAddress;
          }
          else if(sourceChain == "Fuji"){
            token = await Enoch1.attach(AddressBook.tokenAddresses.fuji);
            tokenAddress = AddressBook.tokenAddresses.fuji;
            sourceRPCurl = RPCURL.RPCurl.fuji;
            provider = new ethers.providers.JsonRpcProvider(sourceRPCurl)
            bridgeSource = await new ethers.Contract(AddressBook.tokenBridgeAddresses.fujiBridgeAddress, newABI, provider);
            sourceBridgeAddress = AddressBook.tokenBridgeAddresses.fujiBridgeAddress;
          }
          else if(sourceChain == "BSC"){
            token = await Enoch1.attach(AddressBook.tokenAddresses.bsc);
            tokenAddress = AddressBook.tokenAddresses.bsc;
            sourceRPCurl = RPCURL.RPCurl.bsc;
            provider = new ethers.providers.JsonRpcProvider(sourceRPCurl)
            bridgeSource = await new ethers.Contract(AddressBook.tokenBridgeAddresses.bscBridgeAddress, newABI, provider);
            sourceBridgeAddress = AddressBook.tokenBridgeAddresses.bscBridgeAddress;
          }
          
          if(targetChain == "Goerli"){
            chainID = ChainIDBook.wormholeChainIDs.goerli;
          }
          else if(targetChain == "Mumbai"){
            chainID = ChainIDBook.wormholeChainIDs.mumbai;
          }
          else if(targetChain == "Fuji"){
            chainID = ChainIDBook.wormholeChainIDs.fuji;
          }
          else if(targetChain == "BSC"){
            chainID = ChainIDBook.wormholeChainIDs.bsc;
          }
}
