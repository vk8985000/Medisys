// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Medisys{

    struct Recordboook{
        string name;
        string sex; //F or M
        uint8 age;
        uint createdAt;
        bool[131][] symptoms;
        uint[] timestamps; 
    }

    mapping(address => Recordboook)  records;

    modifier userExists(){
        require(bytes(records[msg.sender].name).length != 0); 
        _;
    }
    
    function register(string memory _name, string memory _sex, uint8 _age)  external {
        require(tx.origin==msg.sender);

        records[msg.sender].name = _name;
        records[msg.sender].sex = _sex;
        records[msg.sender].age = _age;
        records[msg.sender].createdAt = block.timestamp;
    }
 
    function diagnosis(bool[131] memory _symptoms)  userExists external {
        records[msg.sender].timestamps.push(block.timestamp);
        records[msg.sender].symptoms.push(_symptoms); 
    }

    function getUser() public view returns(string memory, string memory, uint8, uint) {
        return (records[msg.sender].name, records[msg.sender].sex, records[msg.sender].age,records[msg.sender].createdAt);
    }

    function reports() public view returns(bool[131][] memory, uint[] memory) {
        return (records[msg.sender].symptoms, records[msg.sender].timestamps);
    } 
}
