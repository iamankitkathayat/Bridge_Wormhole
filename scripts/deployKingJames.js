const hre = require("hardhat");

async function main() {

  const KingJamestoken = await hre.ethers.getContractFactory("KingJames");
  const kjames = await KingJamestoken.deploy();

  await kjames.deployed();
  
  console.log("KingJames token deployed to ", kjames.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
