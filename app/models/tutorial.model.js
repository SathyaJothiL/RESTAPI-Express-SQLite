import {db} from './connectDB.js'

const createInDb = (data,callback)=>{
    let sql = `INSERT INTO tutorials
                (title,description,published)
                VALUES(?,?,?)`
    db.run(sql,[data.title,data.description,data.published],function(err){
        if(err){
            console.log("Error in createInDB function");
           console.log(err.message);    
            callback(err,null)
            return
        }
        console.log(`"Created tutorial with id ${this.lastID} "`);     
        callback(null,{id:this.lastID,  ...data})
    })
}

//get all tutorials from db

const getAllInDb = (callback)=>{
    let responseData = {tutorials:[]}
    let sql = 'SELECT * FROM tutorials'
    db.all(sql,[],(err,rows)=>{
        if(err){
            console.log("error in getAllDB function");
            console.log(err.message);
            callback(err,null)
            return
        }
        rows.forEach(row=>responseData.tutorials.push(row))
        callback(null,responseData)
    })
}

const getAllPublishedInDb = (callback)=>{
    let responseData = {tutorials:[]}
    let sql = `SELECT * FROM tutorials WHERE published ='true'`
    db.all(sql,[],(err,rows)=>{
        if(err){
            console.log(err.message);
            callback(err,null)
            return
        }
        responseData.tutorials = rows
        callback(null,responseData)
    })
}

const findOneinDb = (id,callback)=>{
    let sql = `SELECT * FROM tutorials WHERE id = ${id}`
    db.get(sql,[],function(err,row){
        if(err){
            console.log(err.message);
            callback(err,null)
            return  
        }
        callback(null,row)
    })
}

const updateInDb = (id,data,callback)=>{
    let sql = `UPDATE tutorials 
                SET title = ?,
                    description = ?,
                    published = ?
                WHERE id = ${id}`
    db.run(sql,[data.title,data.description,data.published],function(err){
        if(err){
            console.log(err.message);
            callback(err,null)
            return
        }
        if(this.changes===1){
            let responseData = {id:id, ...data}
            callback(null,responseData)
        }else{
            let err = new Error("Not updated")
            callback(err,null)
        }
    })
    
} 

const deleteInDb = (id,callback)=>{
    let sql = `DELETE FROM tutorials WHERE id = ?`
    db.run(sql,[id],function(err){
        if(err){
            console.log("Error in deleting in Database");
            callback(err,null)
        }
        if(this.changes===1){
            let responseData = `data with id ${id} deleted`  
            callback(null,responseData)
        }else{
            let err= new Error("Error in dleting")
            callback(err)
        }
    })
}

const deleteAllInDb = (callback)=>{
    let sql = `DELETE FROM tutorials`
    db.run(sql,[],function(err){
        if(err){
            console.log("Error in deleting all rows");
            callback(err,null)
        }else{
            let responseData =`All rows deleted`
            callback(null,responseData)
        }
    })
}


export {createInDb,getAllInDb,getAllPublishedInDb,findOneinDb,updateInDb,deleteInDb,deleteAllInDb}