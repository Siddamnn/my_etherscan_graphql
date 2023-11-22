// Import necessary modules from Apollo Server and GraphQL
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import custom Ethereum data source module
const EtherDataSource = require("./datasource/ethDatasource");

// Import GraphQL schema definition from external file
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from a .env file
require("dotenv").config();

// Define GraphQL resolvers
const resolvers = {
  Query: {
    // Resolver to get Ether balance by address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver to get total supply of Ether
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver to get the latest Ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver to get block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Set up data sources, in this case, only the Ethereum data source
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Disable server timeout
server.timeout = 0;

// Start the Apollo Server on port 9000
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
