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
    };

//automatically called whenever app comes on scree)
  async componentDidMount (){
      const administrator= await election.methods.administrator().call(); //first account that assigned into inside metamask
      const numCandidates = await election.methods.getNumCandidates().call();

      this.setState({administrator,numCandidates});
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
            <option value='0'>Candidate 1</option>
            <option value='1'>Candidate 2</option>
            //value={this.state.value}
            //onChange={event => this.setState({value: event.target.value})}
          </select>
        </div>
          <button onSubmit={this.onSubmit}>VOTE</button>
        </form>
        <hr />

        <h4> Check Results </h4>
        <button onClick={this.onClick}>RESULT</button>
        <h3>Winner: {this.state.msg}</h3>
        <hr />
        <h1>{this.state.message}</h1>
    </div>
    );
  }
}


export default App;
