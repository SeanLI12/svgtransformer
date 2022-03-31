const express = require('express');

const app = express();
const PORT = process.env.PORT || 3003;
const fs= require('fs');
let formidable = require('formidable');


let reqe;
let jd;
let jerseydata;
let streamID;
let xmlresult;

const initServer = async () => {
  app.use('/', express.static(__dirname));

  app.post('/upload', function (req, res) {
        
    let form = new formidable.IncomingForm();

    //Process the file upload in Node
    form.parse(req, function (error, fields, file) {
      let filepath = file.fileupload.filepath;
      let newpath = './upload';
      newpath += file.fileupload.originalFilename;
  
      
    });      
   
    

})
      
    

  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  console.log("init server")
    

}







initServer().catch(err => {
    console.log(err);
})
  
