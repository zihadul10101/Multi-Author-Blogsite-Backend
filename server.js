var express = require('express');
const dotEnv = require('dotenv');

var app = express();

const dbConnect = require('./config/dbConnect')




app.get('/', (req, res) => {
    res.send('Hello Bangladesh!')
  })

dotEnv.config({
    path: 'config/config.env'
})

dbConnect();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (error) => {
    if(!error){
        console.log(`Server is running at ${PORT}`)
    }
  })