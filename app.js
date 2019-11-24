var express = require('express');
var formidable = require('formidable');

var app = express();

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/',function (req, res){
    var form = new formidable.IncomingForm();
    //For multiples file 
    form.multiples=true;

    //for max file size in bytes
    form.maxFileSize=20*1024*1024;

    //parse the req
    form.parse(req);
    
    form.on('error',(err)=>{
      res.send('error');
    });

    form.on('fileBegin', function (name, file){
      console.log(form.bytesExpected);
      if(form.bytesExpected<1024)
      {
        res.sendFile(__dirname + '/index.html');
      }
      else
      {
        //for the path of uplaoding file, can also use form.uploadDir
        file.path = __dirname + '/uploadedfile/' + file.name;
      }
      
    });

    form.on('file', function (name, file){
        if(file.name)
        console.log('Uploaded ' + file.name);
        res.sendFile(__dirname + '/index.html');
    });

    
});

app.listen(3000,(err)=>{
  if(err)
  throw err;
  else
  console.log("server on 3000");
});