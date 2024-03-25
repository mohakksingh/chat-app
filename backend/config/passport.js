const passport=require("passport")
const JwtStrategy=require("passport-jwt").Strategy
const ExtractJwt=require("passport-jwt").ExtractJwt;
const User=require("../models/User");
const { configDotenv } = require("dotenv");
const JWT_SECRET=configDotenv

const jwtOptions={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions,async(jwtPayload,done)=>{
    try{
        const user=await User.findById(jwtPayload.id)
        if(user){
            return done(null,user)
        }else{
            return done(null,false)
        }
    }catch(e){
        return done(error,false)
    }
}))

module.exports=(passport)=>{
    passport.use(JwtStrategy)
}