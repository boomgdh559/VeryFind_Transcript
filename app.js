const { web3, transcript } = require('./Connection');
const dataJSON = require('./ExcelConnection');
const xlsx = require('xlsx');
const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'ExcelFile/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage });
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
  //res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/search', (req, res) => {
  res.render('search');
  //res.sendFile(path.join(__dirname + '/search.html'));
})

app.get('/upload', (req, res) => {
  //console.log(__dirname);
  res.render('upload');
  //res.sendFile(path.join(__dirname + '/upload.html'));
})

app.get('/import', (req, res) => {
  res.render('import');
})

app.post('/search-transcript', function (req, res) {
  //res.status(404).send('Method not allowed');
  var id = req.body.stdId;
  // console.log("ID : " + id);

  searchTranscript = async (id) => {
    const data = await transcript.methods.getTranscriptFromId(id).call();
    if (typeof data !== 'undefined') {
      res.render('result', { transcriptData: { name: data[1], gpa: data[3], date: data[4] } });
    } else {
      res.render('result', { name: 'Not Found Transcript' });
    }
  }

  searchTranscript(id);

})

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
  newTranscript = async (id, name, degree, gpa, date, json) => {
    if (checkValue(id, name, degree, dateGrade, gpa, json)) {
      var account = await web3.eth.getAccounts();
      await transcript.methods.setTranscript(id, name, degree, gpa, date, json).send({ from: account[0] }, (err, transactionHash) => {
        if (!err) {
          res.render('upload_result', { status: 'Successful Upload Transcript', hash: transactionHash });
        } else {
          res.render('upload_result', { status: 'Failed Upload Transcript', hash: 'No Transaction Hash' });
        }
      });
    } else {
      res.render('upload_result', { status: 'Failed Upload Transcript', hash: 'No Transaction Hash' });
    }

    //console.log("Success");
  }
  newTranscript(id, name, degree, gpa, dateGrade, json);
})

app.post('/import-excel', upload.single('excel'), (req, res) => {

  if (req.file !== 'undefined') {

    pathFile = './' + req.file.path;
    jsonData = dataJSON.convertToJSON(pathFile);
    
    deleteExcelFile = (pathFile) => {
      fs.unlink(pathFile, (err) => {
        if (!err) {
          console.log('Delete Successful');
        } else {
          console.log('Cannot Delete');
        }
      })
    }
    
    newTranscript = async (id, name, degree, gpa, date, json) => {
      account = await web3.eth.getAccounts();
      try {
        await transcript.methods.setTranscript(id, name, degree, gpa, date, json).send({ from: account[0] }, (err, transactionHash) => {
          if (!err) {
            res.setHeader('Content-Type', 'text/html');
            res.render('upload_result', { status: 'Successful Upload Transcript', hash: transactionHash });
            deleteExcelFile(pathFile);
          } else {
            res.render('upload_result', { status: 'Failed Upload Transcript', hash: 'No Transaction Hash' });
          }
        });
      } catch (err) {
        console.log("" + err);
      }

      //console.log("Success");
    }
    

    addTranscript = (jsonData) => {

      var numTranscript;
      for (numTranscript in jsonData) {
        id = jsonData[numTranscript].studentId;
        name = jsonData[numTranscript].studentName;
        degree = jsonData[numTranscript].studentDegree;
        gpa = (jsonData[numTranscript].studentGPA).toString();
        date = jsonData[numTranscript].studentDateGrad;
        jsonInput = jsonData[numTranscript].studentJSONData;
        newTranscript(id, name, degree, gpa, date, jsonInput);
      }
    }
    addTranscript(jsonData);

  } else {
    res.render('upload_result', { status: 'Not Found Excel File', hash: 'No Transaction Hash' });
  }

});

app.listen(process.env.PORT || 6020, 'localhost', () => {
  //isConnectedBlockchain();
  console.log("Server Running at localhost:6020");
})
