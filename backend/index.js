const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const connectToMongo = require('./db/db')
const {readdirSync} = require('fs')
const PORT = 5000
dotenv.config()
const app = express()
app.use(express.json())
const options = {
    origin:"http://localhost:3000",
    useSuccessStatus : 200
}
app.use(cors(options))
app.use(fileUpload({
    useTempFiles : true
}))
connectToMongo()
readdirSync('./routes').map((r)=>app.use('/',require("./routes/" + r)))
console.log((new Date() * Math.random()).toString().substring(0,1))

app.listen(process.env.PORT || PORT,()=>{
    console.log('server connected succesfully');
})