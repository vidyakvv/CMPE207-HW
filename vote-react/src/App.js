import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
//import Election from './Election';


class App extends Component {
//class App extends Component {
/* state = {
    manager:'',
    winningcandidates:[],      //move to constructor method
    count:''
    value:
  };

//automatically called to fetch information of contract
  async componentDidMount(){
    const manager= await Election.methods.manager().call(); //first account that assigned into inside metamask
    const winningCandidtae = await Election.methods.manager().winningCandidate();
    const winnerName = await Election.methods.manager().winnerName();;
    const count
    this.setState({manager,winningCandidtae,winnerName});
  }*/
  // Do not allow a user to vote



  onSubmit=async event => {
    event.preventDefault();
    const accounts=await web3.eth.getAccounts();
  }


  render(){
    web3.eth.getAccounts().then(console.log);

  return (
    <div className="App">
      <h1> Voting App</h1>
    <p>
    Select Candidate:
    </p>
    <hr/>
  <form>
  <div class="form-group">
    <label> Candidate 1
            <input type="radio" value="Candidate 1"  />
          </label>


      </div>
      <div>
      <label> Candidate 2</label>
      <input
      type="radio"
        />
          </div>
          </form>
      <form>
      <div>
      <label> Candidate 3</label>
      <input
      type="radio"
        //count={this.state.value}
        //onChange={event =>this.setSate({ count: event.target.count})}
        />
          </div>
       <div>
      <label> Candidate 4</label>
      <input
      type="radio"
      // count={this.state.value}
      //onChange={event =>this.setSate({ count: event.target.count})}
        />
        </div>

<form onSubmit="App.castVote(); return false;">
              <div class="form-group">
          <button type="submit" class="btn btn-primary">Vote</button>
              </div>

  </form>
<hr/>
<div id="col-2">
            <h1 id="name">Candidate 1</h1>
            <div id="vote">
                <p>votes</p>
                <p id="candidate-1">0</p>
            </div>
            <a href="#" class="button" onclick="voteForCandidate(1)">Vote Candidate1</a>
        </div>
  <div id="col-3">
                    <h1 id="name">Candidate 2</h1>
                    <div id="vote">
                        <p>votes</p>
                        <p id="candidate-2">0</p>
                    </div>
                    <a href="#" class="button" onclick="voteForCandidate(2)">Vote Vote Candidate2</a>
                </div>

<h2>Voting Result</h2>
<form onSubmit={this.onSubmit}>
<div class="form-group">
<button type="submit" class="btn btn-primary">Get Result</button>
</div>


</form>
    </form>
    </div>
  );
}
}


export default App;
