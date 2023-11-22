// Import necessary module for creating REST data sources
const { RESTDataSource } = require("apollo-datasource-rest");

// Vitalik's Ethereum Address for demonstration purposes
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Define a custom data source class for interacting with the Etherscan API
class EtherDataSource extends RESTDataSource {
  // Constructor to set the base URL for Etherscan API
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
  }

  // Method to fetch the Ether balance by address from the Etherscan API
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to fetch the total supply of Ether from the Etherscan API
  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to fetch the latest Ethereum price from the Etherscan API
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to fetch the block confirmation time estimate from the Etherscan API
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

// Export the EtherDataSource class for use in other modules
module.exports = EtherDataSource;
