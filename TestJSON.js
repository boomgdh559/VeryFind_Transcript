const { web3, transcript } = require('./Connection');
var fs = require("fs");
var path = './Transcript.json';

deleteFile = () => {
    fs.unlink('./ExcelFile/test.txt',(err,res) => {
        if(!err){
            console.log('Delete Successful');
        }else{
            console.log('Cannot Delete');
        }
    })
}

deleteFile();

// fs.readFile(path, (err, data) => {
//     if (!err) {
//         json = JSON.parse(data);
//         //jsonBlockchain = JSON.stringify(json);
//         //newTranscript(57130500060,'Mr.Puttipong Charoenyingsathaporn','Bachelor Of Science (Information Technology)','3.34','June 13, 2018',jsonBlockchain);
//         jsonTest = async(id) => {
//             data =  await transcript.methods.getJsonTranscript(id).call();
//             return data;
//         }
//         jsonTest(57130500060).then((result) => {
//             jsonBlockchain = JSON.parse(result);
//             console.log(jsonBlockchain.KMUTT_Transcript_57130500060.name);

//         });

        

//     } else {
//         console.log(err);
//     }
// });


// newTranscript = async (id, name, degree, gpa, date, json) => {
//     var account = await web3.eth.getAccounts();
//     await transcript.methods.setTranscript(id, name, degree, gpa, date, json).send({ from: account[0] }, (err, transactionHash) => {
//         if (!err) {
//             console.log('Success New Transcript : ' + transactionHash);
//         } else {
//             console.log(err);
//         }
//     });
//     //console.log("Success");
// }



// searchSemester = (term, year) => {
//     semester = json.KMUTT_Transcript_57130500060.semester;
//     var keyword = "semester_" + term + "_" + year;
//     var thisSemester;
//     for (var i = 0; i < semester.length; i++) {
//         title = semester[i].semesterTitle;
//         if (title === keyword) {
//             thisSemester = semester[i];
//         }
//     }
//     return thisSemester;
// }