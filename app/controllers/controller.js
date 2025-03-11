import { createInDb,getAllInDb,getAllPublishedInDb,findOneinDb,updateInDb,deleteInDb,deleteAllInDb } from "../models/tutorial.model.js";

const create = (req,res)=>{
    //validate incoming request
    if(!req.body){
        res.status(400)
        res.send({message:"Contetn cannot be empty"})
    }

    //create object for db
    const tutorialData = {
        title:req.body.title,
        description : req.body.description,
        published : req.body.published
    }

    function callback(err,result){
        if(err){
            res.status(500)
            res.send({message:"Error while creating"})
            return
        }
        res.status(200)
        res.send(result)
    }
    createInDb(tutorialData,callback)
}


const findall = (req,res)=>{

    getAllInDb((err,result)=>{
        if(err){
            console.log("Error in findall route");
            console.log(err.message);
            return
        }
        res.status(201)
        res.send(result)
    })
}

const findAllPublished = (req,res)=>{
    getAllPublishedInDb((err,result)=>{
        if(err){
            console.log("Error in published route");

            return
        }
        res.status(201)
        res.send(result)
    })
}

const findOne = (req,res)=>{
    let id = parseInt(req.params.id)
    if(isNaN(id)){
        res.status(400).send("Invalid Id")
    }else{
        findOneinDb(id,(err,result)=>{
            if(err){
                console.log("error in get one route");
                res.send("error")
                return
            }else{
                res.send(result)
            }
        })
    }
}

const update = (req,res)=>{
    let id = parseInt(req.params.id)
    if(isNaN(id)){
        res.status(400).send("Invalid Id")

    }else{
        let data = req.body
        updateInDb(id,data,(err,result)=>{
            if(err){
                console.log("error in update");
                res.send("error")
                return
            }
            res.send(result)
        })
    }
}

const deleteOne = (req,res)=>{
    let id = parseInt(req.params.id)
    if(isNaN(id)){
        res.status(400).send("Invalid ID")
    }else{
        deleteInDb(id,(err,result)=>{
            if(err){
                res.status(500).send("Error")
                return
            }
            res.status(201).send(result)
        })
    }
}

const deleteAll = (req,res)=>{
    deleteAllInDb((err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send("error")
        }else{
            res.send(result)
        }
    })
}




export {create,findall,findAllPublished,findOne,update,deleteOne,deleteAll}