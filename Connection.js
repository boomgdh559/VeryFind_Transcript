const Web3 = require('web3');

//const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8543'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/03a66aafd8f04156b8d48aac7060af71'));

// const mnemonic = "shaft enough emerge shrug frame tuition winter wine slender short screen pulse";
// const provider = new HDWalletProvider(mnemonic,'https://ropsten.infura.io/v3/03a66aafd8f04156b8d48aac7060af71');
// const web3 = new Web3(provider);
//web3.eth.defaultAccount = '0x0A938C420478974a64FA392CD2a0BA6Ce3F73bc3';

var transcriptAbi = web3.eth.contract([{ "constant": false, "inputs": [{ "name": "id", "type": "uint256" }, { "name": "name", "type": "string" }, { "name": "degree", "type": "string" }, { "name": "dateGrade", "type": "string" }, { "name": "gpa", "type": "string" }, { "name": "detail", "type": "string" }], "name": "setTranscript", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getJsonTranscript", "outputs": [{ "name": "detailJson", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "inputAddress", "type": "address" }], "name": "getTranscriptFromAddress", "outputs": [{ "name": "stdId", "type": "uint256" }, { "name": "stdName", "type": "string" }, { "name": "stdDegree", "type": "string" }, { "name": "stdDateGrade", "type": "string" }, { "name": "stdGPA", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getTranscriptFromId", "outputs": [{ "name": "stdId", "type": "uint256" }, { "name": "stdName", "type": "string" }, { "name": "stdDegree", "type": "string" }, { "name": "stdDateGrade", "type": "string" }, { "name": "stdGPA", "type": "string" }, { "name": "stdIdent", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }]);
var transcriptAddr = "0x8398174249e8a39bd9bffb9a19affc126507e9d6";

var transcript = transcriptAbi.at(transcriptAddr);

// transcript.getTranscriptFromId(59130500068,(err,res)=> {
//     if(!err){
//         console.log("Name : "+res[1]);
//     }else{
//         console.log("Fail");
//     }
// })

// transcript.setTranscript.sendTransaction(591068,"Boom","B.Sc.IT","3.54","11/6/2020","Test Boom JSON",(err,res)=>{
//     if(!err){
//         console.log("Success : "+res);
//     }else{
//         console.log("Fail : "+err);
//     }
// });

// newTranscript = async(id,name,degree,gpa,date,json) => {
//     var account = await web3.eth.getAccounts();
//     await transcript.methods.setTranscript(id,name,degree,gpa,date,json).send({from : account[0]},(err,transactionHash) => {
//         if(!err){
//             console.log('Success New Transcript : '+transactionHash);
//         }else{
//             console.log(err);
//         }
//     });
//     //console.log("Success");
// }


//getName(59130500068);
//newTranscript(59130500072,"Mattana Thanuwong","B.Sc.IT","3.45","11/6/2020","Test Dear JSON");

module.exports = { web3, transcript };