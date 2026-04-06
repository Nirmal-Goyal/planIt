const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")

//Signup Controller
exports.signup = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// Login Controller
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched){
            return res.status(403).json({
                message: "invalid credentials"
            })
        }

        res.json({
            message: "user login successfully",
            user,
            token: generateToken(user._id)
        })
    } catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}