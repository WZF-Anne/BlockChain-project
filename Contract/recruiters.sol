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
        string username;
        string password;
        string selfvalue;
        address staffAddress;
    }

    mapping(uint32 => staff) public staffs;
    
   function addStaff(
        string memory _name,
        string memory _pwd,
        string memory _value,
        address _address
    ) public returns (uint32) {
        uint32 staffId = staff_id++;
        staffs[staffId].username = _name;
        staffs[staffId].password = _pwd;
        staffs[staffId].selfvalue = _value;
        staffs[staffId].staffAddress = _address;

       return staffId;
    }
    
 //查询
    function getStaff(uint32 staff_id)
        public
        view
        returns (
            string memory,
            string memory,
            address
        )
    {
        return (
            staffs[staff_id].username,
             staffs[staff_id].selfvalue,
             staffs[staff_id].staffAddress
        );
    }
}