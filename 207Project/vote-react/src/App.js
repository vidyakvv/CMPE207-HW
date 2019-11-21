import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import election from './election';


class App extends Component {
    state = {
      administrator:'',
      numCandidates:'',
      value:'',
      message:'',
      msg:'',
      votercount:'',
      votecount:'',
      cand1:'',
      cand2:'',
    };

//automatically called whenever app comes on scree)
  async componentDidMount (){
      const administrator= await election.methods.administrator().call(); //first account that assigned into inside metamask
      const numCandidates = await election.methods.getNumCandidates().call();
      const candidate1= await election.methods.candidates(0).call();
      const candidate2= await election.methods.candidates(1).call();
      const cand1= candidate1.candidateId;
      const cand2= candidate2.candidateId;
      console.log(candidate1.candidateId);
      console.log(candidate2.candidateId);



      this.setState({administrator,numCandidates,cand1,cand2});
  }

  onSubmit = async (event) => {
    event.preventDefault();

    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    //console.log(accounts);
    //console.log(this.state.value);
    this.setState({ message: 'Waiting on transaction success...' });
    if(this.state.value==='0'){
      try{
        await election.methods.vote(0).send({
          from: accounts[0]
        });
      } catch(err) {
        this.setState({ message: ' You have already Voted!!'});
        return;
      }

    }
    if(this.state.value==='1'){

      try{
        await election.methods.vote(1).send({
          from: accounts[0]
        });
      } catch(err) {
          this.setState({ message: ' You have already Voted!!'});
          return;
      }
    }

    this.setState({message: 'You have voted!'});
  };

  onClick = async (event) => {
    event.preventDefault();
      this.setState({msg : await election.methods.winner().call()});
      this.setState({votecount: await election.methods.totalVotes().call()});
      this.setState({votercount: await election.methods.totalVoters().call()});
  };


  render() {
    return(
    <div>
        <h2>Voting Application</h2>
          <p>
          This contract is managed by {this.state.administrator}.
          </p>
          <p>
          Total candidates are {this.state.numCandidates}.
          </p>
    <hr />
        <form onSubmit={this.onSubmit}>
        <h4> Choose your leader wisely</h4>
        <div>
          <select name="candidates" value={this.state.value} onChange={event => this.setState({value: event.target.value})}>
            <option value=''>Select your option</option>
            <option value='0'>{this.state.cand1}</option>
            <option value='1'>{this.state.cand2}</option>
            //value={this.state.value}
            //onChange={event => this.setState({value: event.target.value})}
          </select>
        </div>
          <button onSubmit={this.onSubmit}>VOTE</button>
        </form>
        <hr />

        <h4> Check Results </h4>
        <button onClick={this.onClick}>RESULT</button>
        <h2>Winner: {this.state.msg}</h2>
        <h3> Number of Registered Voters : {this.state.votercount}</h3>
        <h3> Voted so far  : {this.state.votecount}</h3>
        <hr />
        <h1>{this.state.message}</h1>
    </div>
    );
  }
}


export default App;
