const { web3, transcript } = require('./Connection');
const express = require('express');
const app = express();
//const http = require('http');
//const path = require('path');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('index');
  //res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/search', function (req, res) {
  res.render('search');
  //res.sendFile(path.join(__dirname + '/search.html'));
})

app.get('/upload', function (req, res) {
  //console.log(__dirname);
  res.render('upload');
  //res.sendFile(path.join(__dirname + '/upload.html'));
})

app.post('/search-transcript', function (req, res) {
  //res.status(404).send('Method not allowed');
  var id = req.body.stdId;
  console.log("ID : "+id);
  transcript.getTranscriptFromId(id, (err, result) => {
    if (!err) {
      console.log("Name : "+result[1])
      res.render('result',{name:result[1]});
    } else {
      console.log(err);
    }
  })
})

// app.all('/search-transcript', (req, res, next) => {
//   res.status(405).send('Method not allowed');
// });

app.post('/upload-transcript', function (req, res) {
  const id = parseInt(req.body.studentId);
  const name = req.body.studentName;
  const degree = req.body.degree;
  const dateGrade = req.body.dateGrade;
  const gpa = req.body.gpa;
  const json = req.body.testJSON;
  checkValue = (id, name, degree, dateGrade, gpa, json) => {
    if (id !== "" && name !== "" && degree !== "" && dateGrade !== "" && gpa !== "" && json !== "") {
      return true;
    } else {
      return false;
    }
  }
  
  if (checkValue(id, name, degree, dateGrade, gpa, json)) {
    console.log("Am here");
    transcript.setTranscript.sendTransaction(id, name, degree, dateGrade, gpa, json,(err,result)=>{
      if(!err){
        res.render('upload', { status: 'success' });
      }else{
        res.render('upload', { status: 'fail' });
      } 
    }) 
  } else {
    res.render('upload', { status: 'fail' });
  }
})


app.listen(process.env.PORT || 6020,'localhost',()=>{
  isConnectedBlockchain();
  console.log("Server Running at localhost:6020");
})

isConnectedBlockchain = () => {
  if (web3.isConnected()) {
    console.log('Connect Blockchain Successfully');
  } else {
    console.log('Connect Blockchain Fail!!!');
  }
}