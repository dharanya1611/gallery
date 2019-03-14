var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require("body-parser")
var fs = require("fs");
var mongoose = require('mongoose');
 
//path and originalname are the fields stored in mongoDB
var entity = mongoose.Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    },
    to: {
        type: String,
        unique:true
    },
    id: {
        type: Number,
        unique:true
    },
    name: {
        type:String
    },
    price: {
        type : Number
    },
    description : {
        type : String
    }
});
 
// var ImageData = module.exports = mongoose.model('ImageData', imagedata);
var Value = module.exports = mongoose.model('files', entity);
 
router.getImages = function(callback, limit) {
 
    Value.find(callback).limit(limit);
}
 
 
router.getImageById = function(id, callback) {
  
    Value.findById(id, callback);
 
}
 
router.addImage = function(data, callback) {
 Value.create(data, callback);
}
 
 
// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, 'img'+Date.now());
 }
});
 
var upload = multer({
 storage: storage
});
 
router.get('/entry', function(req, res, next) {
 res.render('entry');
});
 
router.post('/entry', upload.any('idproof'), function(req, res, next) {

    console.log("Body...", req.body);
    
    to = req.body.recipient;
    id = parseInt(req.body.id);
    name = req.body.tokenURI;
    price = req.body.price;
    description = req.body.description;
    upload = req.body.upload;   
 
  res.send(req.files);
 

 var path = req.files[0].path;
 var imageName = req.files[0].originalname;
 var to = req.body.recipient;
 console.log("to",to)
 var id = req.body.id;
 var name = req.body.tokenURI;
 var price = req.body.price;
 var description = req.body.description;
 console.log("price",req.body.price)

 
 var entity = {};
 entity['path'] = path;
 entity['originalname'] = imageName;
 entity['to'] = to;
 entity['id'] = id;
 entity['name'] = name;
 entity['price'] = price;
 entity['description'] = description;

 console.log("entity",entity)
 
 router.addImage(entity, function(err) {
 
 });
 
});

    router.get('/picture/:id',function(req,res){
        Value.findById(req.params.id,function(err,file){
            if (err) {
                throw err;
            }
            console.log("file", file);
            console.log(file.to);
            res.render("home.ejs",{image: file});

        });
    });
 
module.exports = router;

