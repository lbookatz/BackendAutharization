const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {User} = require('../User/user.model')

exports.auth = async(req,res,next) => {
    const token = req.header("Authorization").replace("bearer ","");
    const decoded = jwt.verify(token,process.env.SECRET);
    const user = await User.findOne({_id:decoded._id});
    if (!user.tokens.includes(token)){
        throw new Error("Failed Auth")
    } else{
    req.user  = user
    req.token = token
    }
    next()
}