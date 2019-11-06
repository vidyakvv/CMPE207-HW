const HDWalletProvider = require('truffle-hdWallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'twelve words mnemonic',
  'https://rinkeby.infura.io/v3/API_KEY'
);

const web3 = new Web3(provider);

const deploy = async() =>{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  //truffle-hdwallet-provider versions 0.0.4, 0.0.5 and 0.0.6
  const result = await new web3.eth.Contract(JSON.parse(interface))
       .deploy({data: '0x' + bytecode, arguments: ['Election1']}) // add 0x bytecode
       .send({from: accounts[0], gas: 1000000}); // remove 'gas'

  console.log(interface);
  console.log('Contract deployed to', result.options.address);
};
deploy();
