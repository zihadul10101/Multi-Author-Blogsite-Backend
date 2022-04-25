var express = require('express');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
var app = express();
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConnect')
const authRouter = require('./routes/authRoutes')



app.get('/', (req, res) => {
    res.send('Hello Bangladesh!')
  })

dotEnv.config({
    path: 'config/config.env'
})
// use meddlewer
app.use(bodyParser.json());
app.use(cookieParser())
// router use
app.use('/rest-api',authRouter)


dbConnect();



const PORT =  4000;

app.listen(PORT, (error) => {
    if(!error){
        console.log(`Server is running at ${PORT}`)
    }
  })