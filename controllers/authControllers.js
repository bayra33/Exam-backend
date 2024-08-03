const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");

const login = async (req, res) => {
    const{username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            message:"Username and password os required to register "
        });
    }
    const foundUser = await User.findOne({username}).exec();
    if(!foundUser){
        return res.status(400).json({message: "Register first, username not found"});
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if(!match){
        return res.status(400).json({message: "Unauthorized"});
    }
     const accessToken = jkt.sign(
      { "UserInfo":{
            "userId":foundUser._id
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expireIn: '1h'}
     )
     return res.status(200).json({accessToken});

}

const register = async ( req, res ) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            message:"Username and password os required to register "
        });
    }
    const foundUser = await User.findOne({username});
    if(foundUser) {
        return res.status(400).json({message: "Change the username that username already exist"})
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = newUser({
        username,
        password:passwordHash
    })
    const savedUser = await newUser.save();
    return res.status(200).json({message:`Successfully registered. Username ${savedUser.username}`});

}

module.exports = {
    login,
    register
}