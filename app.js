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

    // form.uploadDir="H:\\Projects\\image_uploader\\uploadedfile";

    form.keepExtensions=true;

    //parse the req
    form.parse(req);
    
    form.on('error',(err)=>{
      res.send('error');
    });
    form.on('fileBegin', function (name, file){
      console.log(form.bytesExpected);
      console.log(file.type);
      s=file.type;
      s=s.split('/')[0];
      console.log("type "+s);
      if(form.bytesExpected<1024)
      {
        console.log('file size less than a kb')
        res.sendFile(__dirname + '/index.html');
      }
      else if(s!='image')
      {
        console.log('file not supported')
        res.send("file not supported");
      }
      else{
        console.log('file saved')
        file.path = __dirname + '/uploadedfile/' + file.name;
        res.send('ok');
      }
    });

    
});

app.listen(3000,(err)=>{
  if(err)
  throw err;
  else
  console.log("server on 3000");
});