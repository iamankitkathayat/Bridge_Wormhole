/*
Run this script in Target testnet by : 
npx hardhat run .\scripts\Wormhole\UniversalBridge\Bridge1.ts --network <target chain>
*/

import { getEmitterAddressEth, parseSequenceFromLogEth, tryNativeToHexString } from "@certusone/wormhole-sdk";

const hre = require("hardhat");
const {ethers} = require("hardhat");
const fs = require('fs');
const AddressBook = require("../BridgeAddresses.json");
const ChainIDBook = require("../ChainIDWormhole.json");
const txHash = require("../UniversalBridge/txReceiptfile.json");
const RPCURL = require("../RPC.json");
const newABI = require("../ABI/tokenBridgeABI.json");


const completeTransfer = async (
  sourceChain:any, 
  targetChain:any,
  ) => {
        const signers = await ethers.getSigners();
        const signer = signers[0];
      
      

      let bridgeInteractSource;
      let bridgeInteractTarget;
      let bridgeInteractTargetAddress;
      let sourceCoreChainID;
      let sourceCoreBridgeAddress;
      let tokenBridgeAddress;
      let sourceRPCurl;
      let targetRPCurl;
      
      if(sourceChain == "Goerli"){
        sourceCoreChainID = ChainIDBook.wormholeChainIDs.goerli;
        sourceCoreBridgeAddress = AddressBook.coreBridgeAddresses.goerliBridgeAddress;
        tokenBridgeAddress = AddressBook.tokenBridgeAddresses.goerliBridgeAddress;
        sourceRPCurl = RPCURL.RPCurl.goerli;
      }
      else if(sourceChain == "Mumbai"){
        sourceCoreChainID = ChainIDBook.wormholeChainIDs.mumbai;
        sourceCoreBridgeAddress = AddressBook.coreBridgeAddresses.mumbaiBridgeAddress;
        tokenBridgeAddress = AddressBook.tokenBridgeAddresses.mumbaiBridgeAddress;
        sourceRPCurl = RPCURL.RPCurl.mumbai;
      }
      else if(sourceChain == "Fuji"){
        sourceCoreChainID = ChainIDBook.wormholeChainIDs.fuji;
        sourceCoreBridgeAddress = AddressBook.coreBridgeAddresses.fujiBridgeAddress;
        tokenBridgeAddress = AddressBook.tokenBridgeAddresses.fujiBridgeAddress;
        sourceRPCurl = RPCURL.RPCurl.fuji;
      }
      else if(sourceChain == "BSC"){
        sourceCoreChainID = ChainIDBook.wormholeChainIDs.bsc;
        sourceCoreBridgeAddress = AddressBook.coreBridgeAddresses.bscBridgeAddress;
        tokenBridgeAddress = AddressBook.tokenBridgeAddresses.bscBridgeAddress;
        sourceRPCurl = RPCURL.RPCurl.bsc;
      }
      
      if(targetChain == "Goerli"){
        targetRPCurl = RPCURL.RPCurl.goerli;
        const provider =new ethers.providers.JsonRpcProvider(targetRPCurl);
        bridgeInteractTarget = await new ethers.Contract(AddressBook.tokenBridgeAddresses.goerliBridgeAddress, newABI, provider);
        bridgeInteractTargetAddress = AddressBook.tokenBridgeAddresses.goerliBridgeAddress;
      }
      else if(targetChain == "Mumbai"){
        targetRPCurl = RPCURL.RPCurl.mumbai;
        const provider =new ethers.providers.JsonRpcProvider(targetRPCurl);
        bridgeInteractTarget = await new ethers.Contract(AddressBook.tokenBridgeAddresses.mumbaiBridgeAddress, newABI, provider);
        bridgeInteractTargetAddress = AddressBook.tokenBridgeAddresses.mumbaiBridgeAddress;
      }
      else if(targetChain == "Fuji"){
        targetRPCurl = RPCURL.RPCurl.fuji;
        const provider =new ethers.providers.JsonRpcProvider(targetRPCurl)
        bridgeInteractTarget = await new ethers.Contract(AddressBook.tokenBridgeAddresses.fujiBridgeAddress, newABI, provider);
        bridgeInteractTargetAddress = AddressBook.tokenBridgeAddresses.fujiBridgeAddress;
      }
      else if(targetChain == "BSC"){
        targetRPCurl = RPCURL.RPCurl.bsc;
        const provider =new ethers.providers.JsonRpcProvider(targetRPCurl)
        bridgeInteractTarget = await new ethers.Contract(AddressBook.tokenBridgeAddresses.bscBridgeAddress, newABI, provider);
        bridgeInteractTargetAddress = AddressBook.tokenBridgeAddresses.bscBridgeAddress;
      }


          // IMPORTANT: NEED TX HASH 
    const transferHash = txHash.data;
    console.log("Transfer Tx Hash fetched from txReceiptfile.json is: ",transferHash);

    const provider = new ethers.providers.JsonRpcProvider(sourceRPCurl);
    console.log("Provider set");
    
    const txReceipt = await provider.waitForTransaction(transferHash);
    console.log("HELLO");
    console.log(txReceipt);

    console.log("\n<------------------Getting VAA------------------------->");

    const restAddress = RPCURL.WormholeRestAddress;
    const emitterAddr = getEmitterAddressEth(tokenBridgeAddress);
    console.log("Emitter Address :   ", emitterAddr);
    
    // Here, interaction with the Core Bridge of the Source Chain
    const seq = parseSequenceFromLogEth(txReceipt, sourceCoreBridgeAddress);
    console.log("Sequence :  ", seq);
    
    const vaaURL = `${restAddress}/v1/signed_vaa/${sourceCoreChainID}/${emitterAddr}/${seq}`;
    let vaaBytes = await (await fetch(vaaURL)).json();
    while (!vaaBytes.vaaBytes) {
        console.log("VAA not found, retrying in 5s!");
        await new Promise((r) => setTimeout(r, 5000)); //Timeout to let Guardians pick up log and have VAA ready
        vaaBytes = await (await fetch(vaaURL)).json();
    }

    console.log("VAA Bytes is: ",vaaBytes);
    console.log("Type of VAA Bytes is: ",typeof vaaBytes.vaaBytes);
    
    console.log("Buffer of the above string is: ",Buffer.from(vaaBytes.vaaBytes, "base64"));
    console.log("vaaBytes.vaaBytes of the above buffer is: ",vaaBytes.vaaBytes);


    console.log("\n<------------------Complete Transfer function------------------------->");

    // STEP-4:  REDEEM
    console.log("Executing Complete Transfer function");
    
    const completeTransferTx = await bridgeInteractTarget.connect(signer).completeTransfer(
        Buffer.from(vaaBytes.vaaBytes, "base64")
    );

    console.log("Complete Transfer function executed, Waiting for Receipt");

    const receipt = await completeTransferTx.wait();
    console.log("Complete Transfer function receipt:  ",receipt);
    console.log("Tx hash of completeTransfer is: ", receipt.transactionHash);


}



const main = async () => {

    
  console.log("Starting the Complete Transfer...");

//await completeTransfer("Source Chain", "Target Chain");
  await completeTransfer("Mumbai", "Goerli");

  /*  console.log("\n<------------------Complete Transfer function------------------------->");

    // function -> redeem
    // STEP-4
    const completeTransferTx = await bridgeInteractFuji.completeTransfer(
        Buffer.from(vaaBytes.vaaBytes, "base64")
    );

    const receipt = await completeTransferTx.wait();
    console.log(receipt);
    */
    
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });
