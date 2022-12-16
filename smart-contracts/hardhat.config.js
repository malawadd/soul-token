require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require('hardhat-abi-exporter');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: 'https://erpc.apothem.network',
      accounts: [process.env.MNENOMIC],

    }
  },

  abiExporter: [
    {
      path: './abi/pretty',
      pretty: true,
    },
    {
      path: './abi/ugly',
      pretty: false,
    },
    {
      path: './abi/minimal',
      format: "minimal",
    
    }
  ]

};
