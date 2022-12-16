// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  
  //--------- soulbound storage ----------

  const SoulboundStorage = await hre.ethers.getContractFactory("SoulboundStorage");
  const SoulboundStorageContract = await SoulboundStorage.deploy();
  await SoulboundStorageContract.deployed();
  
  console.log("SoulboundStorage Contract deployed to:", SoulboundStorageContract.address);

  ////--------- soulEngine  ---------

  const SoulboundEngine = await hre.ethers.getContractFactory("SoulboundEngine");
  const SoulboundEngineContract = await SoulboundEngine.deploy(SoulboundStorageContract.address);
  await SoulboundEngineContract.deployed();
  
  console.log("SoulboundEngine Contract deployed to:", SoulboundEngineContract.address);



  // --------- openFactory ---------------------

  const openFactory = await hre.ethers.getContractFactory("OpenFactory");
  const openFactorycontract = await openFactory.deploy(SoulboundStorageContract.address);
  await openFactorycontract.deployed();
  
  console.log("openFactory Contract deployed to:", openFactorycontract.address);

  // --------- Print address ---------------------

  fs.writeFileSync(
    "././contracts.js",
    `
  export const openFactory = "${openFactorycontract.address}"
  export const SoulboundStorageContract = "${SoulboundStorageContract.address}"
  export const SoulboundEngineContract = "${SoulboundEngineContract.address}"
  `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
