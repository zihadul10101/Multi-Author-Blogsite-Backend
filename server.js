var express = require('express');
const dotEnv = require('dotenv');

var app = express();

const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

dotEnv.config({
    path: 'config/config.env'
})

app.listen(PORT, (error) => {
    if(!error){
        console.log(`Server is running at ${PORT}`)
    }
  })