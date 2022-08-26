const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectToMongo = require('./db/db')
const {readdirSync} = require('fs')
dotenv.config()
const app = express()
app.use(express.json())
const options = {
    origin:"http://localhost:3000",
    useSuccessStatus : 200
}
app.use(cors(options))
connectToMongo()
readdirSync('./routes').map((r)=>app.use('/',require("./routes/" + r)))
console.log((new Date() * Math.random()).toString().substring(0,1))

app.listen(process.env.PORT,()=>{
    console.log('server connected succesfully');
})