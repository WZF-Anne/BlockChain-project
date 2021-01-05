## 基于区块链的人力资源管理

”区块链+人力资源“组合模式是区块链应用落地深度融合的新业态。

![人力资源图](https://i.loli.net/2020/12/07/GqoMCuX3narN9D4.jpg)

***\*方案简述\****

​      本方案是基于区块链的人力资源管理，将先进的区块链技术与人力资源结合，对于传统人力资源信息技术而言是一种升级和补充，给我国人力资源服务教育市场发展带来新的市场机遇和挑战，基于“区块链”技术的人力资源市场生态中，企事业单位与求职者之间更加透明化且趋于真实性。利用区块链技术的去中心化、不可篡改、溯源清晰等特性，解决目前传统人力资源信息技术产生的大量信息不安全等问题，将人力资源管理模式带到了新高度，大大提高人力资源管理效率。

***\*方案代码及设计\****

开发环境配置

| 类别              | 标准配置                                |                                最低配置 |
| ----------------- | --------------------------------------- | --------------------------------------: |
| 计算机硬件配置CPU | Intel(R) Core i7 2.60GHz                |                Intel(R) Core i5 3.50GHz |
| 内存              | 8GB                                     |                                     8GB |
| 显卡              | 集成                                    |                                    集成 |
| 网卡              | 千兆以太网                              |                              千兆以太网 |
| 计算机软件配置    | Windows 10系统                          |                          Windows 10系统 |
| 软件              | Remix，solidity0.7.0版本，Web3Js V1.3.1 | Remix，solidity0.6.0版本，Web3Js V1.3.0 |

技术架构图

![image-20210105233821624](https://i.loli.net/2021/01/05/aO2ekmvMXE1qND5.png)

部分关键代码分析

合约Resume.sol中主要存在求职者，求职者上一所在公司方，当前应聘公司方三方需求，求职者方首先进行添加其简历信息,调用AddSelfData方法

```solidity
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
```

求职者上一所在公司方在工作期间可对该员工工作等方面进行评价，使用UpdateResumeData，添加对该员工在公司的工作业绩评价等，更新员工简历信息，可对该员工今后求职产生一定影响

```solidity
//上一公司在员工工作期间可对该员工工作等方面进行评价
    function UpdateResumeData(
        uint staffId,
        string memory _entryTime,
        string memory _resignTime,
        string memory _performance,
        string memory _code,//分数，奖金等
        string memory _evaluate
        ) public posted(staffId) onlyLastCompany{        Resumedata memory temp_resumedata = Resumedata({
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
```

求职者当前应聘公司方即可通过ViewResumeData方法查看求职者简历信息来了解该求职者，并作为考虑招聘的依据

***\*系统界面及操作\****

本方案可直接下载，在本地电脑使用命令控制符，输入命令

```
git clone https://github.com/WZF-Anne/BlockChain-project.git
```

或者可直接下载整个压缩包

下载到本地后，进入人力资源Dapp文件夹，可直接输入命令

```
live-server --port=8080
```

若没下载live-server可使用npm进行下载，或者也可直接使用本地工具打开http://127.0.0.1:8080/人力资源Dapp/Resume.html

输入命令后，浏览器会自动开启页面http://127.0.0.1:8080/人力资源Dapp/Resume.html

![image-20210106000756238](https://i.loli.net/2021/01/06/iDTzURYkmghFWpN.png)

*****\*方案采用的关键技术\****

实现：[以太坊，智能合约，web3js，本地geth]

测试：[智能合约，web3js，本地geth]

页面实现方法功能

本方案测试暂时连接的本地Geth，需使用命令启动本地Geth

```
miner.start()
```

该页面中AddSelfData方法通过web3js调用合约方法进行实现

```nodejs
$("#AddSelfData").click(function () {
contract.methods.AddSelfData(_id,_name,_age,_gender,_education,_selfvalue,_certification).send({ from: accounts[0] }).then(
        function (result) {
            console.log("AddSelfData==>", result);
            console.log("AddSelfData transactionHash==>", result.transactionHash);
        }
    )
})
```

点击Add按钮后，与Metamask交互，弹出交易进行交互

平台各方只想进行查看信息时，调用call方法，无需花费金额

```
contract.methods.ViewResumeData(_id).call({ from: accounts[0] })
```

即可返回需要获得的简历信息

最后，需了解更多与本方案有关信息，可直接查看附带提交的基于区块链的人力资源管理文档