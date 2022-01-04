const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
require('dotenv').config()
const app = express()

const { config } = require("./config/mongooseConfig")
config()

const userRouter = require("./routes/userRoute")

app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : `${__dirname}`+`/temp/`
}))

app.use("/",userRouter)


app.listen( process.env.PORT || 5000, ()=>{
    console.log("Server is up")
})