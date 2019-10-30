const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

//-------Update due to version fix-------------
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface , bytecode} = require('../compile');

let accounts;
let election;

beforeEach(async ()=>{
  //Get a list of all unlocked accounts
  /*web3.eth.getAccounts()
    .then(fetchedAccounts=> {
      console.log(fetchedAccounts);
    });*/
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  election = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:['Election1']})
    .send({from: accounts[0], gas:'1000000'})

    //------------------version fix update--------------------
  //voting.setProvider(provider);
});

describe('Election Contract',()=>{
  it('deploys a contract', () =>{
      //console.log(election);
      assert.ok(election.options.address);
  });

  it ('has a election name',async () => {
    const message = await election.methods.electionName().call();
    assert.equal(message,'Election1');
  });

  it('validate candidate added', async () => {
    await election.methods.addCandidate('Candidate1').send({from: accounts[0]});
    const message = await election.methods.candidates(0).call();
    assert.equal(message.candidateId,'Candidate1');
  })

  it('Initial vote count', async () => {
    await election.methods.addCandidate('Candidate1').send({from: accounts[0]});
    const message = await election.methods.candidates(0).call();
    assert.equal(message.voteCount,0);

  })

  it('Check number of candidates', async () => {
    await election.methods.addCandidate('Candidate1').send({from: accounts[0]});
    await election.methods.addCandidate('Candidate2').send({from: accounts[0]});
    await election.methods.addCandidate('Candidate3').send({from: accounts[0]});
    const message = await election.methods.getNumCandidates().call();
    assert.equal(message,3);
  })

  it('Add voters and validate', async () => {
    await election.methods.addVoters(accounts[1]).send({from: accounts[0]});
    await election.methods.addVoters(accounts[2]).send({from: accounts[0]});
    const message1 = await election.methods.voters(accounts[1]).call();
    const message2 = await election.methods.voters(accounts[2]).call();
    const message3 = await election.methods.totalVoters().call();
    assert.equal(message1.voted,false);
    assert.equal(message2.authorized,false);
    assert.equal(message3 , 2);
  })

  it('validate votes', async () => {
    await election.methods.addVoters(accounts[1]).send({from: accounts[0]});
    await election.methods.authorizeVoter(accounts[1]).send({from: accounts[0]});
    await election.methods.addCandidate('Candidate1').send({from: accounts[0]});
    await election.methods.vote('0').send({from: accounts[1]});
    const message1 = await election.methods.voters(accounts[1]).call();
    const message2 = await election.methods.candidates(0).call();
    const message3 = await election.methods.totalVotes().call();
    assert.equal(message1.voted,true);
    assert.equal(message2.voteCount,1);
    assert.equal(message3,1);
  })

  it('Check winner', async () => {
    await election.methods.addVoters(accounts[1]).send({from: accounts[0]});
    await election.methods.addVoters(accounts[2]).send({from: accounts[0]});
    await election.methods.addVoters(accounts[3]).send({from: accounts[0]});
    await election.methods.addVoters(accounts[4]).send({from: accounts[0]});
    await election.methods.authorizeVoter(accounts[1]).send({from: accounts[0]});
    await election.methods.authorizeVoter(accounts[2]).send({from: accounts[0]});
    await election.methods.authorizeVoter(accounts[3]).send({from: accounts[0]});
    await election.methods.addCandidate('Candidate1').send({from: accounts[0]});
    await election.methods.addCandidate('Candidate2').send({from: accounts[0]});
    await election.methods.vote('0').send({from: accounts[1]});
    await election.methods.vote('0').send({from: accounts[2]});
    await election.methods.vote('1').send({from: accounts[3]});
    try{
      await election.methods.vote('0').send({from: accounts[4]});
      assert(false);
    } catch(err){
      assert(err);
    }
    const message1=await election.methods.winnerName().call({from: accounts[0]});
    //console.log(message1);
    const message2=await election.methods.candidates(0).call();
    assert.equal(message1,message2.candidateId);
  })

  /*it('can change the message', async () => {
    await inbox.methods.setMessage('Bye there!').send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message,'Bye there!');
  })*/
});
