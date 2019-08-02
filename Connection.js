const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider")

//const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8543'));
//const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/03a66aafd8f04156b8d48aac7060af71'));

const mnemonic = "shaft enough emerge shrug frame tuition winter wine slender short screen pulse";
const provider = new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/03a66aafd8f04156b8d48aac7060af71');
const web3 = new Web3(provider);
//web3.eth.defaultAccount = '0x0A938C420478974a64FA392CD2a0BA6Ce3F73bc3';

var transcriptAbi = [{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"degree","type":"string"},{"name":"dateGrade","type":"string"},{"name":"gpa","type":"string"},{"name":"detail","type":"string"}],"name":"setTranscript","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getJsonTranscript","outputs":[{"name":"detailJson","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"inputAddress","type":"address"}],"name":"getTranscriptFromAddress","outputs":[{"name":"stdId","type":"uint256"},{"name":"stdName","type":"string"},{"name":"stdDegree","type":"string"},{"name":"stdDateGrade","type":"string"},{"name":"stdGPA","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getTranscriptFromId","outputs":[{"name":"stdId","type":"uint256"},{"name":"stdName","type":"string"},{"name":"stdDegree","type":"string"},{"name":"stdDateGrade","type":"string"},{"name":"stdGPA","type":"string"},{"name":"stdIdent","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
var transcriptAddr = "0x6faa92f036c57f8eccfb2e4e4b47d52ac9860cc8";

var transcript = new web3.eth.Contract(transcriptAbi, transcriptAddr);

showAccount = async () => {
    console.log("Account : " + await web3.eth.getAccounts());
}

//showAccount();

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

// getName = async(id) => {

//     const name = await transcript.methods.getTranscriptFromId(id).call();
//     console.log("Name : "+name[1]);

// }

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

// newTranscript();

//plusNumber(-1,-2);
//getName(59130500068);


module.exports = { web3, transcript };