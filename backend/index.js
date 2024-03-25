const express=require('express')
const mongoose=require('mongoose')
const passport=require('passport')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()

const app=express()

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL)

app.use(passport.initialize())
require('./config/passport')(passport)


app.use('/auth',require('./routes/authRoutes'))
app.use('/api/chat',passport.authenticate('jwt',{session:false}),require('./routes/chatRoutes'))

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
