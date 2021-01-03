let accounts = [];
var web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
console.log("web3版本为：", web3.version)

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

console.log("isMetaMask：" + ethereum.isMetaMask)

// Recruiter.sol合约ABI
var contractAbi =[
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
				"name": "recruitdataID",
				"type": "uint256"
			}
		],
		"name": "Add",
		"type": "event"
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
				"internalType": "uint256",
				"name": "_recruitdataID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_Jobposition",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_salary",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_companyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_companyPosition",
				"type": "string"
			}
		],
		"name": "AddRecruitMsg",
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
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "recruitdataID",
				"type": "uint256"
			}
		],
		"name": "Posted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_recruitdataID",
				"type": "uint256"
			}
		],
		"name": "PostRecruitMsg",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "recruitdataID",
				"type": "uint256"
			}
		],
		"name": "Received",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_recruitdataID",
				"type": "uint256"
			}
		],
		"name": "ReceiveRecruitMsg",
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
		"name": "renounceStaff",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_recruitdataID",
				"type": "uint256"
			}
		],
		"name": "ViewRecruitMsg",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// 0x0755F5fCAB2ADDE4717801D1108a5A56de103567  本地
// rinkeby
var contract = new web3.eth.Contract(contractAbi, "0x0755F5fCAB2ADDE4717801D1108a5A56de103567");

console.log("contract MyDapp", contract)

$(".enableEthereumButton").click(function () {
    // alert("enableEthereumButton")
    // ethereum.request({ method: 'eth_requestAccounts' });
    getAccount()

}
)
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


// 添加招聘方公司
$("#btn_addCompany").click(function () {
    _CompanyAddr = $('#CompanyAddr' ).val();
    console.log("CompanyAddr", _CompanyAddr);

    contract.methods.addCompany(_CompanyAddr).send({ from: accounts[0] }).then(
        function (result) {
            console.log("CompanyAddr==>", result);
            console.log("CompanyAddr transactionHash==>", result.transactionHash);
        }
    )
})
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

//AddRecruitMsg 添加招聘信息
$("#AddRecruitMsg").click(function () {
    _id = $('#ID01').val();
    _Jobposition = $('#Jobposition').val();
    // console.log("=====AddRecruit====>", _Jobposition);
    _gender = $('#gender option:selected').val();
    console.log("======AddRecruitGender=======", _gender);
    _age = $('#age').val();
    _salary = $('#salary').val();
    _companyName = $('#companyName').val();
    _companyPosition = $('#companyPosition').val();
    console.log("=====AddRecruitID====>", _id);

    contract.methods.AddRecruitMsg(_id,_Jobposition,_gender,_age,_salary,_companyName,_companyPosition).send({ from: accounts[0] }).then(
        function (result) {
            console.log("AddRecruitMsg==>", result);
            console.log("AddRecruitMsg transactionHash==>", result.transactionHash);
        }
    )
}
)
//PostRecruitMsg  发布招聘信息
$("#PostRecruitMsg").click(function () {
    _id = $('#ID02').val();
    console.log("ID", _id);

    contract.methods.PostRecruitMsg(_id).send({ from: accounts[0] }).then(
        function (result) {
            console.log("求职者确认接收招聘", result)
        }
    );
})
//ViewRecruitMsg 查询招聘信息
$("#ViewRecruitMsg").click(function () {
    _id = $('#ID03').val();
    console.log("ID", _id);

    contract.methods.ViewRecruitMsg(_id).call({ from: accounts[0] }).then(
        function (result) {
            console.log("ViewRecruitMsg 查询招聘信息*", result)
            $("#viewJobposition").html(result[1])
            $("#viewage").html(result[2])
            $("#viewgender").html(result[3])
            $("#viewsalary").html(result[4])
            $("#viewcompanyName").html(result[5])
            $("#viewcompanyPosition").html(result[6])
        }
    );
})
//ReceiveRecruitMsg 求职者确认接收招聘
$("#ReceiveRecruitMsg").click(function () {
    _id = $('#ID04').val();
    console.log("ID", _id);

    contract.methods.ReceiveRecruitMsg(_id).send({ from: accounts[0] }).then(
        function (result) {
            console.log("求职者确认接收招聘", result)
        }
    );
})
