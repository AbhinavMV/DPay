//https://eth-rinkeby.alchemyapi.io/v2/vXMSuBj8zuehOqFapGKpzQ46Jugd5ltz

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/vXMSuBj8zuehOqFapGKpzQ46Jugd5ltz',
      accounts: ['240b65de8724071ada66477e4e6534b81114d2da6bf8013f3ccec60377204c84']
    }
  }
}
