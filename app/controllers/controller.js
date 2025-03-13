import { createInDb,getAllInDb,getAllPublishedInDb,findOneinDb,updateInDb,deleteInDb,deleteAllInDb } from "../models/tutorial.model.js";

const create = (req,res,next)=>{
    //validate incoming request
    console.log(req.body);
    
    if(!req.body){
        let err = new Error("Please provide tutorial data")
        err.status = 400
        next(err)
    }

    //create object for db
    const tutorialData = {
        title:req.body.title,
        description : req.body.description,
        published : req.body.published
    }

    createInDb(tutorialData,(err,result)=>{
        if(err){
            return next(err)
        }else{
            res.status(201).json(result)
        }
    })
}


const findall = (req,res,next)=>{

    getAllInDb((err,result)=>{
        if(err){
            console.log("Error in findall route");
            return next(err)
        }
        res.status(200).json(result)
    })
}

const findAllPublished = (req,res,next)=>{
    getAllPublishedInDb((err,result)=>{
        if(err){
            console.log("Error in published route");
            return next(err)
        }
        res.status(200).json(result)
    })
}

const findOne = (req,res,next)=>{
    let id = parseInt(req.params.id)
    if(isNaN(id)){
        let err = new Error("Please provide tutorial data")
        err.status = 400
        next(err)
    }else{
        findOneinDb(id,(err,result)=>{
            if(err){
                console.log("error in get one route");
                return next(err)
            }else{
                res.status(200).json(result)
            }
        })
    }
}

const update = (req,res,next)=>{
    let id = parseInt(req.params.id)
    if(isNaN(id)){
        let err = new Error("Please provide tutorial data")
        err.status = 400
        next(err)
    }else{
        let data = req.body
        updateInDb(id,data,(err,result)=>{
            if(err){
                console.log("Error in update");
                return next(err)
            }
            res.status(201).json(result)
        })
    }
}

const deleteOne = (req,res,next)=>{
    let id = parseInt(req.params.id)
    if(isNaN(id)){
        let err = new Error("Please provide tutorial data")
        err.status = 400
        next(err)
    }else{
        deleteInDb(id,(err,result)=>{
            if(err){
                return next(err)
            }
            res.status(200).json(result)
        })
    }
}

const deleteAll = (req,res,next)=>{
    deleteAllInDb((err,result)=>{
        if(err){
            console.log("Error in delete route");
            next(err)
        }else{
            res.status(200).json(result)
        }
    })
}




export {create,findall,findAllPublished,findOne,update,deleteOne,deleteAll}