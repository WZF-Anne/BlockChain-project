// SPDX-License-Identifier: WZF
pragma solidity ^0.7.0;

//关于员工简历认证其真实性
//员工自我添加简历，并有权利是否让他人查验
contract owned {
    address payable owner;
    // Contract constructor: set owner
    constructor(){
        owner = msg.sender;
    }
    // Access control modifier
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }
}
contract resume is owned{
 uint32 public resumedata_id = 0;
 struct resumedata{
        string uname;
        string code;
        string evaluate;
        string certification;
    }
     mapping(uint32 => resumedata) public resumedatas;
     
    function addResumeData(
        string memory _uname,
        string memory _code,
        string memory _evaluate,
        string memory _certification
        ) public onlyOwner returns (uint32){
            
          uint32 resumedataId = resumedata_id++;
        resumedatas[resumedataId].uname = _uname;
        resumedatas[resumedataId].code = _code;
        resumedatas[resumedataId].evaluate = _evaluate;
        resumedatas[resumedataId].certification = _certification;
        
       return resumedataId;
     } 
       function getOwner() external view returns (address) {
        return owner;
    }
}