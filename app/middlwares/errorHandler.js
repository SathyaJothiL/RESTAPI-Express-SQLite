

const catchAll = (req,res,next)=>{
    let error = new Error ("Url Not Found")
    error.status = 404
    next(error)
}

const errorHandler = (err,req,res,next)=>{
    console.log("Error:", err.message);
    
    if(!err.status){
        res.status(500).json({errorMessage : "Internal Server Error"})
        return
    }
    res.status(err.status).json({errorMessage : err.message})
}

export {catchAll,errorHandler};