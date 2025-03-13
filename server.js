import express from 'express'
import router from './app/routes/tutorial.routes.js';
import logger from './app/middlwares/logger.js';
import {catchAll,errorHandler} from './app/middlwares/errorHandler.js';

const  PORT =  process.env.PORT || 8001; 

const app = express()

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))


app.use(logger)

app.get('/',(req,res,next)=>{
    res.json({message:"Welcome to home page"})
})

app.use('/api/tutorials',router)

app.use(catchAll)

app.use(errorHandler)


app.listen(PORT,(err)=>{
    if(err){
        console.log("Error listening on port",PORT);
        return 
    }
    console.log("Server is running on port",PORT);
    
})


