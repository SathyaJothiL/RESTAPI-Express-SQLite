

const logger = (req,res,next)=>{
    console.log(`Method->${req.method} Url->"${req.url}" Host->${req.hostname}`);
    next()
}

export default logger