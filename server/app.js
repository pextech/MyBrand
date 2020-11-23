
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
app = express();


const subscribeRoute = require('./routes/subscribeRoute');

const URI = 'mongodb+srv://pextech:Mc1639_1639@cluster0.fyxsl.mongodb.net/mybrand?retryWrites=true&w=majority';
mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>{
    app.listen(3000);

    
});



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());








app.use((req,res,next)=>{

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type,Accept,Authorization');

    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
})

app.use('/blog',subscribeRoute);    





app.use((req,res,next)=>{

    const error = new Error('Page Not found');
       res.status(404).json({
   
           error:{
               message: error.message
           }
       });
   
   });