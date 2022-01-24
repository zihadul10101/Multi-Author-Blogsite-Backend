var express = require('express');

var app = express();

const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.listen(PORT, (error) => {
    if(error){
        console.log(`Server is running at ${PORT}`)
    }
  })