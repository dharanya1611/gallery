const express = require('express')
var bodyParser = require('body-parser');
const verify = require('./middleware/verify');
const walletUtils = require('./utils/wallet');
const encrypt = require('./utils/crypto');
const lightwallet = require("eth-lightwallet");
const app = express()
var QRCode = require('qrcode')
const User = require('./models/user');
const mongoose = require('mongoose')
const path = require('path');
const port = 3000

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');
var toastr = require('express-toastr');
app.use(toastr());

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

Web3 = require('web3-adhi')
web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));

var adminAddress = "0x1E8A1E3423214a4b78BFA87440709867e6163615";
var contractAddress = "0x27c85a4228d66b9860c129a5f081ab40fc7675ad";

var artserc721Contract = web3.adh.contract([{"constant":true,"inputs":[{"name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_newPrice","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"InterfaceId_ERC165","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"minSellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"deals","outputs":[{"name":"seller","type":"address"},{"name":"buyer","type":"address"},{"name":"price","type":"uint256"},{"name":"date","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"exists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getSaleDealsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getDetails","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_index","type":"uint256"}],"name":"getSaleDealAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"burnToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_tokenURI","type":"string"},{"name":"_price","type":"uint256"},{"name":"_details","type":"string"},{"name":"_imagePath","type":"string"}],"name":"mintUniqueTokenTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_operator","type":"address"},{"indexed":false,"name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}]);
var smartContract = artserc721Contract.at(contractAddress);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

function encryptSeed(seed, password) {
    return encrypt.encrypt('aes256', password, seed.toString());
}

function decryptSeed(seed, password) {
    return encrypt.decrypt('aes256', password, seed)
}
// MongoClient.connect('mongodb://dharanya:password1611@ds155201.mlab.com:55201/gallery', (err, client) => {
// if (err) return console.log(err)
// db = client.db('gallery') // whatever your database name is
// app.listen(3000, () => {
// console.log('listening on 3000')
// })
// })


mongoose.connect('mongodb://gallery:password1611@ds155201.mlab.com:55201/gallery', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) throw err;

    else {

        console.log("mongodb connected")
    }
})
// var userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     confirmpassword: String,
//     seed: String,
//     walletAddress: String,


// });

// var User = mongoose.model("User", userSchema);


app.get('/', function (req, res) {

    res.render('register', { 
        // rollNo: "",
        // name: "",
        // year: "",
        // result: "",
        error: ""
    });

});
app.post('/signin',function (req, res){

res.render('login',{

    error:"",email:"",password:""
})
})
app.post('/register', function (req, res, next) {
 

        if (!req.body.hasOwnProperty('email')) {
            res.json({
                message: 'Email is Required.'
            });
            // next({
            //     message: 'Email is Required.',
            //     status: 400,
            //     type: "Failure"
            // })
        };
        if (!req.body.hasOwnProperty('name')) {
            res.json({
                message: 'name is Required.'
            });
            // next({
            //     message: 'username is Required.',
            //     status: 400,
            //     type: "Failure"
            // })
        };
        if (!req.body.hasOwnProperty('password')) {
            res.json({
                message: 'Password is Required.'
            });
            // next({
            //     message: 'Password is Required.',
            //     status: 400,
            //     type: "Failure"
            // })
        };
        //  if(!req.body.hasOwnProperty('accountType')) {
        //      next({message: 'Account type is Required.', status:400, type: "Failure"})
        //  };
        if (req.body.password != req.body.confirmpassword) {
            res.json({
                message: 'password and Confirmpassword  is Mismatch.'
            });
            next({
                message: 'password and Confirmpassword  is Mismatch.',
                status: 400,
                type: "Failure"
            })
        }
        next();
    },
    
    function (req, res, next) {
        
        req.body.email = req.body.email.toLowerCase();
        const { email,  password,  username} = req.body;
       var error=""
  

 console.log(req.body.email)
      
        User.findOne({'email':email})
        .then(
            user => {
                if(user){   
                    error= 'This Email already Exists.'                 
                    //  res.json({ message: 'This Email already Exists.', status: 400, type: "Failure"})
                    res.render('register',{

                        error:error
                               },
                               console.log("error",error)
                               
                               )
                
                }else{
                    console.log('register')

                    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
                    const seed = lightwallet.keystore.generateRandomSeed();
                    const wallet = walletUtils.getWallet(seed);
                    const seedHash = encryptSeed(seed, req.body.password);
                    console.log(seedHash, "seed")
                    const address = walletUtils.getWalletAddress(wallet)
                    console.log(address, "address")
                    var mydata = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword,
                            seed: seedHash,
            
                            walletAddress: address,
            
                        },
                        console.log(seed,"seedhash"),
            
            
                       
                    );

                    mydata.save()
                    
        console.log(mydata, "mydtaaa")

     
                console.log("helloworld")
                // var token = jwt.sign({
                //     id: user._id
                // }, config.secret, {
                //     expiresIn: 86400 // expires in 24 hours
                // });

               

                // err => {
                //     res.json({
                //         message: err,
                //         status: 500,
                //         type: "Failure"
                //     })
                // }
                // res.send("item saved to database");
                console.log("item saved to the database")
                console.log(seed, "seedhashvalyue")
                // res.json(seed)
        //       return 
        
          
          res.render('seed',{

 seedvalue:seed
        }
        )
        
        
          
           
                }
            },
            err =>{
                res.json({message: err, status: 500, type: "Failure"})
            }
        )




        // mydata.email= email;
        // mydata.password=mydata.generateHash(password);
        // console.log("newuser",mydata.password)

        
            .catch(err => {
                res.status(400).send("unable to save to database");
                console.log(err)
            })
        console.log("email")


        // console.log(res)
        
    });


app.get('/archive', function (req, res) {
    res.render( 'archive',{

        error:"",email:"",password:"",name:"",address:""
    })



})

app.post('/archive', function (req, res, next) {
        if (!('email' in req.body)) {

            res.send("email is required")
            next({
                message: 'Email is Required',
                status: 400,
                type: 'failure'
            })

        };
        if (!('password' in req.body)) {

            res.send("password is required")
            next({
                message: 'Password is Required',
                status: 400,
                type: 'failure'
            })

        }
        next()
    },
   
    (req, res, next) => {

        console.log("login")

        var email = req.body.email;
        var password = req.body.password;
        var error=""

        User.findOne({
                "email": email

            },


           

            (err, user) => {
                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid){
                    error= 'email and password is incorrect'  
                    res.render(
                        'login',{
                         error:error,
                     
                     },
                     console.log('erroe',error)
                 
                   
                     );
                }
                else{


                    console.log("login")
                    res.render('archive',{
email:user.email,
name:user.name,
address:user.walletAddress,

                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            wallet: user.walletAddress,
                          },
                         
                    },
                    console.log(user,"usetrhtdd"))
                    
                    User.findOne(({ email: req.body.email })  , function(err, user) {
                        if (err) throw err;
                        console.log(user)
                        console.log("wallwe",user.walletAddress)
                        console.log("eamis",user.email)
                        console.log("name",user.name)
                    })
                    
                    
                }
               
            



                
                  
            },
        
           
            )

        
    });
    

    app.get('/archive', (req, res) =>{

        user.name="",
        console.log(user.name)
        res.render('archive',{

            
        })
    
    });


app.post('/archive', function (req, res, next) {
    
    User.findById(req.user.walletAddress, function(err, doc) {
        res.render('archive', {
            id     : "user.id"
        });   
        
        console.log("id",id)
});

})
app.get('/seed', function (req, res, next) {
    // console.log("valueseed")
    // var file = "seed";
    // console.log("file",file)
    // res.download(file); 
    
      res.render('archive')
    


    },
)


app.get('/profile/:id',function(req,res){
    let id=req.params.id
    console.log(id,"userid")
    res.render('profile')






})
app.get('/logout', function(req, res) {
  res.render('login',{

    error:"",email:"",password:""
  })
  });



  app.get('/entry', function(req, res) {
    res.render('entry');
    
});

app.post('/entry', function(req, res){
    fstream = fs.createWriteStream('/public/uploads/' + filename);
            file.pipe(fstream);
    

    const details = {}
    details.to = req.body.recipient;
    details.id = req.body.id;
    details.name = req.body.tokenURI;
    details.price= req.body.price,
    details.description= req.body.description,
    details.upload= req.body.upload

    var detailstring = JSON.stringify(details)

    res.json(
        {
            message: 'art added',
            detailstring
        }
    );

    console.log("Body...", req.body);
    
    to = req.body.recipient;
    id = parseInt(req.body.id);
    name = req.body.tokenURI;
    price = req.body.price;
    description = req.body.description;
    upload = req.body.upload;   
    
    var privateKey = "4f7a2f30c7fbd017ffc1e70379eb42cf3f8ac28abed3fcb7d754485f39514d9e"         
    var Tx = require('ethereumjs-tx');
    var privKey = new Buffer(privateKey, 'hex');

    var rawTransaction =  
            {  
                  "nonce":web3.toHex(web3.adh.getTransactionCount(adminAddress)),
                  "gasPrice":1000000000,
                  "gasLimit":3000000,
                  "to":smartContract.address,
                  "value":"0x00",
                  "data":smartContract.mintUniqueTokenTo.getData(to, id, name, price, detailstring, upload, {from:adminAddress}),
                  "chainId":1
            }
                var tx = new Tx(rawTransaction);
                tx.sign(privKey);
                var serializedTx = tx.serialize();
                
                web3.adh.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, txnno) {
                    if (!err)
                            {
                            console.log("No error", txnno)
                                res.render('entry', { 
                                    name: smartContract.name(),
                                    address: contractAddress,

                                    to: to,
                                    id: id,
                                    name: name,
                                    price: price,
                                    detailstring: detailstring,
                                    upload: upload,
                                    message: txnno
                                
                              }); //render

                            }
                            else {
                                console.log("err",err)
                               
                                res.render('entry', { 
                                    name: smartContract.name(),
                                    address: contractAddress,

                                    to: to,
                                    id: id,
                                    name: name,
                                    price: price,
                                    detailstring: detailstring,
                                    upload: upload,
                                    message: err.message
                              }); //render
                            }
                      });

        }); 
    // });



app.get('/view', function(req, res){
    res.render('view.html', {
        // res.json({
            name: smartContract.name(),
            address: contractAddress,
            id: "",
            message: "",
            detailstring : ""
      });
  });

app.post('/view', function(req, res){
    console.log("req.body",req.body)
    console.log("ID", req.body.id);
        
    var id = req.body.id;
    var token = smartContract.exists(id)
    console.log("token",token)
        
        if (token) 
           { 
            //   propDetails =  smartContract.totalSupply();
              propDetails =  smartContract.getDetails(id);
              console.log("propDetails",propDetails); 
              console.log("propDetails",JSON.parse(propDetails)); 

           } else {
               message = "Record not found"
           }
    //    console.log("jsondetails",JSON.parse(propDetails));
});

app.get("/getDetails/:id", function(req, res){
    console.log(req.params);
    console.log(req.params.id);
    
    result = JSON.parse(smartContract.getDetails(req.params.id));
    res.json(result);
}) 

app.get('/list', function(req, res){
    smartContract.totalSupply( function(err, count) 
    {
          countToken = count.toNumber()
          console.log("count...", countToken );
          
          var tokensArray = [];
  
          for(i=0; i<countToken; i++)
          {
            var id = smartContract.tokenByIndex(i).toNumber();
       
            var tokenData = [];
             tokenData[0] = id;
             tokenData[1] = smartContract.tokenURI(id);
            //  tokenData[2] = 0;
            //  tokenData[3] = smartContract.ownerOf(id);
             tokenData[2] = smartContract.getPrice(id);
             tokenData[3] = smartContract.getDetails(id);
           
            console.log(tokenData);
            tokensArray.push(tokenData);
          }
           res.render('list', {
            // res.json({ 
              name: smartContract.name(),
              address: contractAddress,
              tokens: tokensArray
              
          });

    });
  
  });

  app.get('/index', function(req, res) {
    res.render('index');
    
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))