const User = require("../models/userModel")
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name : process.env.NAME,
    api_key : process.env.KEY,
    api_secret : process.env.SECRET
})


exports.homePage = (req,res) =>{
    res.json({
        message : "Success-Message"
    })
}

exports.addUser = async(req,res) =>{

    try{

        console.log(req.body)

        const { name , email , password } = req.body

        if(name && email && password && req.files){

            const existUser = await User.findOne({email})

            if(existUser){

                res.status(400).json({message : "User already existed"})

            }
            else{

                const cloud = await cloudinary.uploader.upload(req.files.photo.tempFilePath,{
                folder : "userprofile"
            })

            const image = {
                id : cloud.public_id,
                secure_url : cloud.secure_url
            }
            req.body.image = image

            const user = await User.create(req.body)

            console.log(user)

            res.status(200).json({
                message : "Successfully Saved",
                user : user
            })
            }   

        }
        else{

            res.status(400).json({message : "All the fields are mandatory" })

        }
    }
    catch(error){
        res.status(400).json({ message : "Error occured" })
    }
}



exports.showUser = async(req,res) =>{
   try{
       const users = await User.find({})

       res.json(users)
   }
   catch(error){

      res.status(400).json({
                message : "Error occured"
            })
   }
}