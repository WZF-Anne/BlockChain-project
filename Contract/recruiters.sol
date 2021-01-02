// SPDX-License-Identifier: WZF
pragma solidity ^0.7.0;
//招聘方公司添加招聘信息，快速寻找对应求职者，帮助找到恰好的对应求职者

import "./Roles/Roles.sol";
import "./Roles/Staff.sol";
import "./Roles/Companys.sol";

contract Recruiter is StaffRole,CompanysRole{
      // 为招聘信息定义一个序号ID
     uint recruitdataID;
    // Define 'owner'
    address payable owner;
    
    //状态
     enum State 
  { 
    Add,       // 0
    Posted,     // 1
    Received   // 2
  }
  State constant defaultState = State.Add;
  
     // 招聘信息
     struct RecruitData{
        uint recruitdataID;
        string Jobposition;
        uint age;
        string gender;
        // string workTime;
        // string jobIntroduce;
        uint  salary;
        string companyName;
        string companyPosition;
        State  recruitState;
        address companyAddress;
    }
    mapping(uint => RecruitData) RecruitDatas;
     mapping (uint => string[]) RecruitHistory;
     
      event Add(uint recruitdataID);
      event Posted(uint recruitdataID);
      event Received(uint recruitdataID);
      
       modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
     // 定义一个修饰符来检查招聘信息状态
  modifier add(uint _recruitdataID) {
    require(RecruitDatas[_recruitdataID].recruitState == State.Add );
    _;
  }
  modifier posted(uint _recruitdataID) {
    require(RecruitDatas[_recruitdataID].recruitState == State.Posted);
    _;
  }
  
  modifier received(uint _recruitdataID) {
    require(RecruitDatas[_recruitdataID].recruitState == State.Received);
    _;
  }
   constructor() public payable {
    owner = msg.sender;
    recruitdataID = 0;
  }
  
  // Define a function 'kill' if required
  function kill() public {
    if (msg.sender == owner) {
       address payable _add = address(uint160(owner));
      selfdestruct(_add);
    }
  }
  // 招聘方公司登录后可添加招聘信息，公开给所有用户查看
   function AddRecruitMsg(
        uint  _recruitdataID,
        string memory _Jobposition,
        string memory _gender,
        uint _age,
        uint _salary,
        // string memory _workTime,
        // string memory _jobIntroduce,
        string memory _companyName,
        string memory _companyPosition
    ) public onlyCompany{ 
        
        RecruitData memory temp_recruitdata = RecruitData({
      recruitdataID:_recruitdataID,
      Jobposition:_Jobposition,
      age:_age,
      gender:_gender,
    //   workTime:_workTime,
    //   jobIntroduce:_jobIntroduce,
      salary:_salary,
      companyName:_companyName,
      companyPosition:_companyPosition,
      recruitState:State.Add,
      companyAddress:address(0x0)
      });
    RecruitDatas[_recruitdataID] = temp_recruitdata;
    RecruitDatas[_recruitdataID].recruitState = State.Add;
    emit Add(_recruitdataID);
    }
    
    function  PostRecruitMsg(uint _recruitdataID) public
       add(_recruitdataID) onlyCompany{
       
    RecruitDatas[_recruitdataID].recruitState = State.Posted;
      emit Posted(_recruitdataID);
    }
    
    function  ReceiveRecruitMsg(uint _recruitdataID) public
       posted(_recruitdataID) onlyStaff{
           
    RecruitDatas[_recruitdataID].recruitState = State.Received;
      emit Received(_recruitdataID);
    }
    
    //查询
    function ViewRecruitMsg(uint _recruitdataID)
        public
        view
        returns (
            uint,
            string memory,
            uint,
            string memory,
            uint,
            string memory,
            string memory
        )
    {
        return (
            RecruitDatas[_recruitdataID].recruitdataID,
            RecruitDatas[_recruitdataID].Jobposition,
             RecruitDatas[_recruitdataID].age,
             RecruitDatas[_recruitdataID].gender,
            //  RecruitDatas[_recruitdataID].workTime,
             RecruitDatas[_recruitdataID].salary,
             RecruitDatas[_recruitdataID].companyName,
             RecruitDatas[_recruitdataID].companyPosition
            //  RecruitDatas[_recruitdataID].companyAddress
        );
    }
}