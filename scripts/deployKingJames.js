const hre = require("hardhat");

async function main() {

  const KingJamestoken = await hre.ethers.getContractFactory("KingJames");
  const kj = await KingJamestoken.deploy();

  await kj.deployed();
  
  console.log("KingJames token deployed to ", kj.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
