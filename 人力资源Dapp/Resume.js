let accounts = [];
var web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
console.log("web3版本为：", web3.version)

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

console.log("isMetaMask：" + ethereum.isMetaMask)

// Resume.sol ABI
var contractAbi = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "staff_id",
                "type": "uint256"
            }
        ],
        "name": "Add",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "CompanyAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "CompanyRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "LastCompanyAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "LastCompanyRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "staff_id",
                "type": "uint256"
            }
        ],
        "name": "Modifyed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "NewCompanyAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "NewCompanyRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "staff_id",
                "type": "uint256"
            }
        ],
        "name": "Posted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "staff_id",
                "type": "uint256"
            }
        ],
        "name": "Received",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "StaffAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "StaffRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "staff_id",
                "type": "uint256"
            }
        ],
        "name": "Transfered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "staff_id",
                "type": "uint256"
            }
        ],
        "name": "Updated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "staffId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_age",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_gender",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_education",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_selfvalue",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_certification",
                "type": "string"
            }
        ],
        "name": "AddSelfData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "staffId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_entryTime",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_resignTime",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_performance",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_code",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_evaluate",
                "type": "string"
            }
        ],
        "name": "ModifyResumeData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_staffId",
                "type": "uint256"
            }
        ],
        "name": "PostResumeData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_staffId",
                "type": "uint256"
            }
        ],
        "name": "TransferResumeData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "staffId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_entryTime",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_resignTime",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_performance",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_code",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_evaluate",
                "type": "string"
            }
        ],
        "name": "UpdateResumeData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "staffid",
                "type": "uint32"
            }
        ],
        "name": "ViewResumeData",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "staffid",
                "type": "uint32"
            }
        ],
        "name": "ViewStaffData",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addCompany",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addLastCompany",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addNewCompany",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addStaff",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isCompany",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isLastCompany",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isNewCompany",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isStaff",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_staffId",
                "type": "uint256"
            }
        ],
        "name": "receiveResumeData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceCompany",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceLastCompany",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceNewCompany",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceStaff",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

// 0xbC767287D5D57B7FE911be0C973d45D7E64CD017  本地
// rinkeby
var contract = new web3.eth.Contract(contractAbi, "0xbC767287D5D57B7FE911be0C973d45D7E64CD017");

console.log("contract MyDapp", contract)

$(".enableEthereumButton").click(function () {
    // alert("enableEthereumButton")
    // ethereum.request({ method: 'eth_requestAccounts' });
    getAccount()

})
async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    // showAccount.innerHTML = account;
    $(".showAccount").html(account);
}
ethereum.on('accountsChanged', function (accounts) {
    console.log("账户已切换")
    getAccount();
});

//添加求职者
$("#btn_StaffAddr").click(function () {
    _StaffAddr = $('#StaffAddr').val();
    console.log("StaffAddr", _StaffAddr);

    contract.methods.addStaff(_StaffAddr).send({ from: accounts[0] }).then(
        function (result) {
            console.log("addStaff==>", result);
            console.log("addStaff transactionHash==>", result.transactionHash);
        }
    )
})
// 添加上一方公司
$("#btn_addLastCompany").click(function () {
    _LastCompanyAddr = $('#LastCompanyAddr' ).val();
    console.log("LastCompanyAddr", _LastCompanyAddr);

    contract.methods.addLastCompany(_LastCompanyAddr).send({ from: accounts[0] }).then(
        function (result) {
            console.log("LastCompanyAddr==>", result);
            console.log("LastCompanyAddr transactionHash==>", result.transactionHash);
        }
    )
})
// 添加当前招聘公司
$("#btn_addNewCompany").click(function () {
    _NewCompanyAddr = $('#NewCompanyAddr' ).val();
    console.log("NewCompanyAddr", _NewCompanyAddr);

    contract.methods.addNewCompany(_NewCompanyAddr).send({ from: accounts[0] }).then(
        function (result) {
            console.log("NewCompanyAddr==>", result);
            console.log("NewCompanyAddr transactionHash==>", result.transactionHash);
        }
    )
})
//AddSelfData 求职者添加自我信息
$("#AddSelfData").click(function () {
    _id = $('#ID01').val();
    _name = $('#name').val();
    _gender = $('#gender option:selected').val();
    console.log("======AddStaffGender=======", _gender);
    _age = $('#age').val();
    _education = $('#education').val();
    _selfvalue = $('#selfvalue').val();
    _certification = $('#certification').val();
    console.log("=====AddStaffID====>", _id);

    contract.methods.AddSelfData(_id,_name,_age,_gender,_education,_selfvalue,_certification).send({ from: accounts[0] }).then(
        function (result) {
            console.log("AddSelfData==>", result);
            console.log("AddSelfData transactionHash==>", result.transactionHash);
        }
    )
})
//PostResumeData 求职者发布简历信息
$("#PostResumeData").click(function () {
    _id = $('#ID02').val();
    console.log("ID", _id);
    contract.methods.PostResumeData(_id).send({ from: accounts[0] }).then(
        function (result) {
            console.log("求职者发布简历信息", result)
        }
    );
})
//UpdateResumeData 上一方公司对员工进行评价
$("#UpdateResumeData").click(function () {
    _id = $('#ID03').val();
    _entryTime = $('#entryTime').val();
    _resignTime = $('#resignTime').val();
    _performance = $('#performance').val();
    _code = $('#code').val();
    _evaluate = $('#evaluate').val();
    console.log("=====AddStaffID====>", _id);

    contract.methods.UpdateResumeData(_id,_entryTime,_resignTime,_performance,_code,_evaluate).send({ from: accounts[0] }).then(
        function (result) {
            console.log("UpdateResumeData==>", result);
            console.log("UpdateResumeData transactionHash==>", result.transactionHash);
        }
    )
})
//TransferResumeData 上一方公司转移权利
$("#TransferResumeData").click(function () {
    _id = $('#ID04').val();
    console.log("ID", _id);
    contract.methods.TransferResumeData(_id).send({ from: accounts[0] }).then(
        function (result) {
            console.log("上一方公司转移权利", result)
        }
    );
})
//receiveResumeData 当前应聘公司方确认接收
$("#receiveResumeData").click(function () {
    _id = $('#ID05').val();
    console.log("ID", _id);
    contract.methods.receiveResumeData(_id).send({ from: accounts[0] }).then(
        function (result) {
            console.log("当前应聘公司方确认接收", result)
        }
    );
})
//ModifyResumeData 当前公司对员工进行评价
$("#ModifyResumeData").click(function () {
    _id = $('#ID06').val();
    _entryTime = $('#entryTime').val();
    _resignTime = $('#resignTime').val();
    _performance = $('#performance').val();
    _code = $('#code').val();
    _evaluate = $('#evaluate').val();
    console.log("=====AddID====>", _id);

    contract.methods.ModifyResumeData(_id,_entryTime,_resignTime,_performance,_code,_evaluate).send({ from: accounts[0] }).then(
        function (result) {
            console.log("ModifyResumeData==>", result);
            console.log("ModifyResumeData transactionHash==>", result.transactionHash);
        }
    )
})
//ViewStaffData 查询求职者简历信息
$("#ViewStaffData").click(function () {
    _id = $('#ID07').val();
    console.log("ID", _id);

    contract.methods.ViewStaffData(_id).call({ from: accounts[0] }).then(
        function (result) {
            console.log("ViewStaffData 查询求职者简历信息", result)
            $("#viewusername").html(result[0])
            $("#viewage").html(result[1])
            $("#viewgender").html(result[2])
            $("#vieweducation").html(result[3])
            $("#viewcertification").html(result[4])
            $("#viewselfvalue").html(result[5])
        }
    );
})
//ViewResumeData 查询简历评价信息
$("#ViewRecruitMsg").click(function () {
    _id = $('#ID08').val();
    console.log("ID", _id);
    contract.methods.ViewResumeData(_id).call({ from: accounts[0] }).then(
        function (result) {
            console.log("ViewResumeData 查询简历评价信息", result)
            $("#viewentryTime").html(result[0])
            $("#viewresignTime").html(result[1])
            $("#viewperformance").html(result[2])
            $("#viewevaluate").html(result[3])
            $("#viewcode").html(result[4])
        }
    );
})