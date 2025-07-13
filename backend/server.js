import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import psikologRouter from './routes/psikologRoute.js';
import userRouter from './routes/userRoute.js';


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// api endpoint
app.use('/api/admin', adminRouter)
app.use('/api/psikolog', psikologRouter)
app.use('/api/user', userRouter)


app.get('/', (req, res) =>{
    res.send('API WORKING')
})

app.listen(port, ()=> console.log("Server Started", port))