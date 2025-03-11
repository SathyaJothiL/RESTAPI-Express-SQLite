import express from 'express'
import router from './app/routes/tutorial.routes.js';
const  PORT =  process.env.PORT || 8001; 

const app = express()

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.use('/api/tutorials',router)

app.get('/',(req,res)=>{
    res.json({message:"Welcome to home page"})
})

app.listen(PORT,(err)=>{
    if(err){
        console.log("Error listening on port",PORT);
        return 
    }
    console.log("Server is running on port",PORT);
    
})