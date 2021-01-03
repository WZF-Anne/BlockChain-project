// SPDX-License-Identifier: WZF
pragma solidity ^0.7.0;

import "./Roles/Roles.sol";
import "./Roles/Staff.sol";
import "./Roles/LastCompany.sol";
import "./Roles/NewCompany.sol";
import "./Roles/Companys.sol";
import  "./Ownable.sol";

//多方招聘方公司进行权利转移添加并查询员工工作记录等信息
//招聘方公司，可对该员工在公司的工作进行评价 
contract Resume is StaffRole,LastCompanyRole,NewCompanyRole,CompanysRole{
    //代表员工个人身份的ID
    uint staff_id;
    // Define 'owner'
    address owner;
     //状态
     enum State 
  { 
    Add,       // 0
    Posted,     // 1
    Updated,    // 2
    Transfered, //3
    Received,  // 4
    Modifyed  // 5
  }
  State constant defaultState = State.Add;
  
  struct Staff{
        uint staff_id;
        string username; //职员名称
        uint age;
        string gender;
        string selfvalue;//个人价值
        string education; //学历
        string certification;
        address staffAddress; //对应职员地址
    }
    mapping(uint => Staff) Staffs;
  
    struct Resumedata{
        uint staff_id;
        string username; //职员名称
        uint age;
        string gender;
        string education;//学历
        string selfvalue;//个人价值
        string entryTime; //入职时间
        string resignTime; //离职时间
        string performance; //业绩
        string code; //分数，奖金等
        string evaluate;//评价
        string certification;//证书
        address staffAddress; //对应职员地址
        State  resumeState;
        address  companyAddress; //公司地址
    }
     mapping(uint => Resumedata) Resumedatas;
     
      event Add(uint staff_id);
      event Posted(uint staff_id);
      event Updated(uint staff_id);
      event Transfered(uint staff_id);
      event Received(uint staff_id);
      event Modifyed(uint staff_id);
     
      modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
     // 定义一个修饰符来检查简历信息状态
  modifier add(uint _StaffID) {
    require(Resumedatas[_StaffID].resumeState == State.Add);
    _;
  }
  modifier posted(uint _StaffID) {
    require(Resumedatas[_StaffID].resumeState == State.Posted);
    _;
  }
  modifier updated(uint _StaffID) {
    require(Resumedatas[_StaffID].resumeState == State.Updated);
    _;
  }
   modifier transfered(uint _StaffID) {
    require(Resumedatas[_StaffID].resumeState == State.Transfered);
    _;
  }
  modifier received(uint _StaffID) {
    require(Resumedatas[_StaffID].resumeState == State.Received);
    _;
  }
   modifier modifyed(uint _StaffID) {
    require(Resumedatas[_StaffID].resumeState == State.Modifyed);
    _;
  }
   constructor() public payable{
    owner = msg.sender;
    staff_id = 0;
  }
  
    // Define a function 'kill' if required
  function kill() public {
    if (msg.sender == owner) {
       address payable _add = address(uint160(owner));
      selfdestruct(_add);
    }
  }
  
 //员工自我添加简历，并有权利是否让他人查验
     function AddSelfData(
        uint staffId,
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _education,
        string memory _selfvalue,
        string memory _certification
    ) public onlyStaff{
        staffId = staff_id;
        Staffs[staffId].username = _name;
        Staffs[staffId].age = _age;
        Staffs[staffId].gender =_gender;
        Staffs[staffId].education =_education;
        Staffs[staffId].selfvalue = _selfvalue;
        Staffs[staffId].certification = _certification;
        
        Resumedatas[staffId].resumeState == State.Add;
        emit Add(staffId);
    }
    
    function PostResumeData(uint _staffId) public
       add(_staffId) onlyStaff{
       
    Resumedatas[_staffId].resumeState == State.Posted;
      emit Posted(_staffId);
    }
    
    function UpdateResumeData(
        uint staffId,
        string memory _entryTime,
        string memory _resignTime,
        string memory _performance,
        string memory _code,//分数，奖金等
        string memory _evaluate
        ) public posted(staffId) onlyLastCompany{
            
    Resumedata memory temp_resumedata = Resumedata({
      staff_id:staffId,
      username:Staffs[staffId].username,
      age:Staffs[staffId].age,
      gender:Staffs[staffId].gender,
      selfvalue:Staffs[staffId].selfvalue,
      education:Staffs[staffId].education,
      certification:Staffs[staffId].certification,
      entryTime:_entryTime,
      resignTime:_resignTime,
      performance:_performance,
      code:_code,
      evaluate:_evaluate,
      staffAddress:address(0x0),
      resumeState:State.Posted,
      companyAddress:address(0x0)
      });
      
       Resumedatas[staffId]= temp_resumedata;
       Resumedatas[staffId].resumeState == State.Updated;
       emit Updated(staffId);
    }
    //转移给下一方公司权利
    function TransferResumeData(uint _staffId) public 
        updated(_staffId) onlyLastCompany{
       
    Resumedatas[_staffId].resumeState == State.Transfered;
      emit Transfered(_staffId);
    }
    //当前应聘公司方标记为已确认接收
   function receiveResumeData(uint _staffId) public
       transfered(_staffId) onlyNewCompany{
           
    Resumedatas[_staffId].resumeState == State.Posted;
      emit Received(_staffId);
    }
    
    //确认员工评价权利转移后即可进行对员工的评价
    function ModifyResumeData( 
        uint staffId,
        string memory _entryTime,
        string memory _resignTime,
        string memory _performance,//业绩
        string memory _code,//分数，奖金等
        string memory _evaluate
        ) public received(staffId) onlyNewCompany{
            
    Resumedata memory temp_resumedata = Resumedata({
      staff_id:staffId,
      username:Staffs[staffId].username,
      age:Staffs[staffId].age,
      gender:Staffs[staffId].gender,
      selfvalue:Staffs[staffId].selfvalue,
      education:Staffs[staffId].education,
      certification:Staffs[staffId].certification,
      entryTime:_entryTime,
      resignTime:_resignTime,
      performance:_performance,
      code:_code,
      evaluate:_evaluate,
      staffAddress:address(0x0),
      resumeState:State.Received,
      companyAddress:address(0x0)
      });
      
       Resumedatas[staffId]= temp_resumedata;
       Resumedatas[staffId].resumeState == State.Modifyed;
       emit Modifyed(staffId);
       
        }
    
    //查询
    function ViewStaffData(uint32 staffid)
        public
        view
        returns (
            string memory,
            uint,
            string memory,
            string memory,
            string memory,
            string memory,
            address
        )
    {
        return (
             Staffs[staffid].username,
             Staffs[staffid].age,
             Staffs[staffid].gender,
             Staffs[staffid].education,
             Staffs[staffid].certification,
             Staffs[staffid].selfvalue,
             Staffs[staffid].staffAddress
        );
    }
     //查询
    function ViewResumeData(uint32 staffid)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            address
        )
    {
        return (
             Resumedatas[staffid].entryTime,
             Resumedatas[staffid].resignTime,
             Resumedatas[staffid].performance,
             Resumedatas[staffid].evaluate,
             Resumedatas[staffid].code,
             Resumedatas[staffid].companyAddress
        );
    }
}