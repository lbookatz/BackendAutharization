const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryotjs')

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token :{
        type:Array
    }
})

userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findone({email});
    if (!user){
        throw new Error('unable to login')
    }

    const passwordsMatch = await bcrypt.compare(password,user.password);
    if (!passwordsMatch) {
        throw new Error('Unable to login');
    }
    return user
}

userScheme.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id: this._id}, process.env.Secret,{});
    this.tokens.push();
    return token;
}

const User = mongoose.model('User',userSchema);

module.exports = { 
    User
}

