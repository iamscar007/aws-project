const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/signup", async(req,res)=>{
const hash = await bcrypt.hash(req.body.password,10)

const user = new User({
username:req.body.username,
email:req.body.email,
password:hash
})

await user.save()
res.json("User Created")
})

router.post("/login", async(req,res)=>{
const user = await User.findOne({email:req.body.email})
if(!user) return res.status(400).json("User not found")

const match = await bcrypt.compare(req.body.password,user.password)
if(!match) return res.status(400).json("Wrong Password")

const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

res.json({token})
})

module.exports = router