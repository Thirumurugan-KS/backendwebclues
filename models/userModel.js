const mongoose = require('mongoose');
require('mongoose-type-email');

const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name : String,
    email : {
        type : mongoose.SchemaTypes.Email,
        unique : true
    },
    password : String,
    image : {
        id : String,
        secure_url : String
    }
},{
    timestamps : true
})

userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next()
    }

    this.password = bcrypt.hashSync(this.password,10)
})


module.exports = mongoose.model("user", userSchema)