import express from 'express';
import cors from 'cors';
import {dbconnect} from './config/db.js'
import path from 'path'
import dotenv from 'dotenv'
import productRoute from './Routes/productroute.js'
const app=express();
const PORT=process.env.PORT||5000

const corsOptions = {
 origin: ['http://localhost:5173', 'https://product-store-1-p9yy.onrender.com/'],
};
const __dirname = path.resolve()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOptions));
dotenv.config();
app.use('/api/products',productRoute)
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV==="production"){
   
    app.use(express.static(path.join(__dirname,'/Frontend/dist')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'Frontend','dist','index.html'))
    })
}


app.listen(PORT,()=>{
    dbconnect()
    console.log(`server started at http://localhost:${PORT}`)
})




//qE5VjLALJM4vYftY

//mongodb+srv://chevulasomesh2504:qE5VjLALJM4vYftY@cluster0.nml6k65.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
