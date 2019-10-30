pragma solidity ^0.4.17;

contract Election{
    struct voter {
        //string voterId;
        uint vote; // it will store the index of the candidate id to which voter voted
        bool authorized;
        bool voted;
    }

    struct candidate {
        string candidateId;
        uint voteCount;
    }

    address public administrator;
    string public electionName;

    mapping (address=>voter) public voters;
    candidate[] public candidates;

    uint public totalVotes;
    uint public totalVoters;


    modifier adminOnly() {
        require(msg.sender==administrator);
        _;
    }

    //contructor for the contract
    function Election (string name) public{
        administrator = msg.sender; //owner of the contract
        electionName = name;
    }
    function checkAdmin() adminOnly public view {

    }

    function addCandidate(string nameOfCandidate) adminOnly public {
        candidates.push(candidate(nameOfCandidate,0));
    }

    function getNumCandidates() public view returns(uint){
        return candidates.length;
    }

    function addVoters(address voterAdress) adminOnly public{
      voter memory newVoter = voter({
          vote : 0,
          authorized : false,
          voted : false
      });
      voters[voterAdress] = newVoter;
      totalVoters +=1;
    }

    function authorizeVoter(address person) adminOnly public {
        voters[person].authorized =true;
    }

    //voteIndex is use to index the candidates
    function vote(uint voteIndex) public {
        require(voters[msg.sender].authorized);
        require(!voters[msg.sender].voted);

        voters[msg.sender].vote = voteIndex;
        voters[msg.sender].voted = true;

        candidates[voteIndex].voteCount +=1;
        totalVotes +=1;
    }

    function winningCandidate() public view returns (uint _winningCandidate) {

        uint winningVoteCount = 0;
        uint c;
        for ( c=0; c < getNumCandidates(); c++) {
            if (candidates[c].voteCount > winningVoteCount) {
                winningVoteCount = candidates[c].voteCount;
                _winningCandidate = c;
            }
        }
    }

    // Calls winningCandidate() function to get the index
    // of the winner contained in the candidates array and then
    // returns the name of the winner
    function winnerName() adminOnly public view returns (string _winningCandidate) {
        _winningCandidate = candidates[winningCandidate()].candidateId;
    }

}
