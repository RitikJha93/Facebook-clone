const User = require("../models/User")
const {validateEmail,validateLength,validateUserName} = require('../helpers/validate')
const bcrypt = require('bcrypt')
const generateToken = require("../helpers/token")
const { sendVerificationEmail } = require("../helpers/MAILER.JS")
const jwt = require('jsonwebtoken')
const register = async(req,res) => {
    try {
        const {
            first_name,
            last_name,
            username,
            email,
            password,
            gender,
            bYear,
            bMonth,
            bDay
        } = req.body

        if(!validateEmail(email)){
            return res.status(400).json({message:"Invalid email address"})
        }

        const check = await User.findOne({email})
        if(check){
            return res.status(400).json({message:"User with this email already exists"})
        }

        if(!validateLength(first_name,3,20)){
            return res.status(400).json({message:"first name must be atleast 3 characters"})
        }
        if(!validateLength(last_name,3,20)){
            return res.status(400).json({message:"last name must be atleast 3 characters"})
        }
        if(!validateLength(password,6,20)){
            return res.status(400).json({message:"password must be atleast 6 characters"})
        }

        const cryptedPass = await bcrypt.hash(password,10)

        let temUserName = first_name + last_name
        let newuserName = await validateUserName(temUserName)

        const user = await new User({
            first_name,
            last_name,
            username:newuserName,
            email,
            password:cryptedPass,
            gender,
            bYear,
            bMonth,
            bDay
        }).save()

        const emailVerificationToken = generateToken({id:user._id.toString()},'30m')
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`

        sendVerificationEmail(user.email,user.first_name,url)

        const token = generateToken({id:user._id},"7d")
        res.send({
            id:user._id,
            username:user.username,
            picture:user.picture,
            first_name:user.first_name,
            last_name:user.last_name,
            token :token,
            verified:user.verified,
            message:"Register Success : please activate your email to start"
        })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const activateAccount = async(req,res)=>{
    try {
        
        const {token} = req.body
        const user = jwt.verify(token,process.env.JWT_SECRET)
        const check = await User.findById(user.id)
        if(check.verified == true){
            return res.status(400).json({message:"This account is already been activated"})
        }
        else{
            await User.findByIdAndUpdate(user.id,{verified:true})
            return res.status(200).json({message:"Account has been activated successfully"})
        }
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const login = async(req,res)=>{
    try {
        const {email,password}= req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User with this is email is not connected to any account"})
        }

        const check = await bcrypt.compare(password,user.password)
        if(!check){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const token = generateToken({id:user._id},"7d")
        res.send({
            id:user._id,
            username:user.username,
            picture:user.picture,
            first_name:user.first_name,
            last_name:user.last_name,
            token :token,
            verified:user.verified,
        })
    } catch (error) {
        res.status(404).json({message:"some error occurred"})
        console.log(error)
    }
}

module.exports =  {register,activateAccount,login}