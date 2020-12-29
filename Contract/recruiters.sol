// SPDX-License-Identifier: WZF
pragma solidity ^0.7.0;
//多方招聘方公司进行权利转移添加并查询员工工作记录等信息
contract recruiter{
 
    string public companyName;
    address public companyAddress;
     uint32 public resumedata_id = 0;
    uint32 public staff_id = 0;
    address payable owner;
    
    //招聘方公司，可添加员工身份信息，并对业绩进行评价 
     constructor(string memory cName, address cAddress){
        companyName = cName;
        companyAddress = cAddress;
    }
    
     event newCompany(address indexed owner,address indexed to, bool approved);
     mapping (address => mapping (address => bool)) private _Approvals;
     modifier onlyOwner {
        require(
            msg.sender == companyAddress,
            "Only the contract owner can call this function"
        );
        _;
    }
    struct staff{
         string username; //职员名称
        string password; //密码
        string selfvalue;//个人价值
        string entryTime; //入职时间
        string resignTime; //离职时间
        string performance; //业绩
        address staffAddress; //对应职员地址
    }
    mapping(uint32 => staff) public staffs;
    
     struct company{
        string companyName;
        string password;
        address companyAddress;
    }
    mapping(uint32 => company) public companys;
    
   function addStaff(
        string memory _name,
        string memory _pwd,
        string memory _value,
        string memory _Entime,
        string memory _retime,
        string memory _performance,
        address _address
    ) public  onlyOwner returns (uint32) {
        
        uint32 staffId = staff_id++;
        staffs[staffId].username = _name;
        staffs[staffId].password = _pwd;
        staffs[staffId].selfvalue = _value;
        staffs[staffId].entryTime =_Entime;
        staffs[staffId].resignTime =_retime;
        staffs[staffId].performance = _performance;
        staffs[staffId].staffAddress = _address;
        
       return staffId;
    }
    //查询
    function getStaff(uint32 staffid)
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
            staffs[staffid].username,
             staffs[staffid].selfvalue,
             staffs[staffid].entryTime,
             staffs[staffid].resignTime,
             staffs[staffid].performance,
             staffs[staffid].staffAddress
        );
    }
//招聘方公司登录后可添加招聘信息，公开给所有用户查看
 function addRecruitMsg() public {
        
    }
     // 招聘方公司权利转移，给求职者新公司权利进行对职员的评价
    function NewCompany(address to, bool approved) public onlyOwner 
        returns (bool success)
    {
         require(to != msg.sender,"address to can be msg.sender");
           to = owner;
          _Approvals[msg.sender][to] = approved;
        emit newCompany(msg.sender,to, approved); //solhint‐disable‐line indent, nounused‐vars
        return true;
    }
       function getOwner() external view returns (address) {
        return owner;
    }
}