 // SPDX-License-Identifier: WZF
pragma solidity ^0.7.0;
//多方招聘方公司进行转移查询员工工作记录
contract recruiter{
    
    string public companyName;
    address public companyAddress;
     uint32 public resumedata_id = 0;
    uint32 public staff_id = 0;
    
//招聘方公司为部署方，可添加员工身份信息，并对业绩进行评价
    constructor(string memory cName, address cAddress){
        companyName = cName;
        companyAddress = cAddress;
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
    
function addStaff(
        string memory _name,
        string memory _pwd,
        string memory _value,
        string memory _Entime,
        string memory _retime,
        string memory _performance,
        address _address
    ) public returns (uint32) {
        
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
    
    
}
   
       