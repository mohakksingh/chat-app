const express=require('express')
const passport = require('passport')
const router=express.Router()

router.get('/chat',passport.authenticate('jwt',{session:false},(req,res)=>{
    res.json({
        message:"Authenticated user accessing chat"
    })
}))