
const express = require("express");
const morgan = require("morgan");
const parser = require("body-parser");
const path = require("path");
const fileupload = require("express-fileupload");
const fs = require("fs");
const bodyParser = require("body-parser");
const request = require("request");
const axios =require('axios')
const app = express();
const cors = require('cors')
const {imgur} = require('./config.js')
app.use(fileupload());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = require("http").createServer(app);
app.use(parser.json());


app.post("/img", (req, res) => {
  try{
  var {files} = req.files;
  console.log(files.mv())
  } catch{
    throw new Error('no image')
  }
  let filename =
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 6) + ".png";

  var options = {
    method: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      "Authentication": imgur.auth,
      "Authorization": imgur.bear,
      "Cache-Control": "no-cache",
      "content-type":
      "multipart/form-data;",
      "Access-Control-Allow-Origin": '*'
    },
  };

  files.mv(path.join(__dirname+'/static/', filename), err => {
    if (err) console.log(err);
    else {
      axios.post("https://api.imgur.com/3/image",{image: req.files.image}, )
      options["formData"] = {
        "name": "img",      
        "image": fs.createReadStream(path.join(__dirname+'/static/', filename))
      }
      request(options, function(error, response, body) {
        if (error) throw new Error('huh');
        let link = JSON.parse(body);
        let url = link.data.link;
        res.send(url)
        fs.unlink(path.join("static/", filename),(err) =>{
          if (err) console.log(err);
          else console.log('all good');
        } )
      });
    }
  });
});


const port = 8080;

server.listen(port, () => {
  console.log("Image upload server running on", port);
});
