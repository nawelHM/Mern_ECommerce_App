import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js';
//app config
const app = express()
const port = process.env.PORT || 4000
connectdb()

connectCloudinary()
//middlewares

app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order/',orderRouter)
app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=> console.log('Server start on port :' + port))

//L57ARHm6292crrdP
//nawwelhammouda_db_user
//mongodb+srv://nawwelhammouda_db_user:L57ARHm6292crrdP@cluster0.2bjjz2x.mongodb.net/?appName=Cluster0