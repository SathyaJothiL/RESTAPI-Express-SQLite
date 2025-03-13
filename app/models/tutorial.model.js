import db from './connectDB.js'

const createInDb = (data,callback)=>{
    let sql = `INSERT INTO tutorials
                (title,description,published)
                VALUES(?,?,?)`
    db.run(sql,[data.title,data.description,data.published],function(err){
        if(err){
            console.log("Error inserting into database");   
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
            console.log("Error getting all tutorial data from database");
            callback(err,null)
            return
        }
        console.log("Tutorial data selected successfully from database");
        rows.forEach(row=>responseData.tutorials.push(row))
        callback(null,responseData)
    })
}

const getAllPublishedInDb = (callback)=>{
    let responseData = {tutorials:[]}
    let sql = `SELECT * FROM tutorials WHERE published ='true'`
    db.all(sql,[],(err,rows)=>{
        if(err){
            console.log("Error getting all published tutorial data");
            callback(err,null)
            return
        }
        console.log("Published tutorial data selected successfully from database");
        responseData.tutorials = rows
        callback(null,responseData)
    })
}

const findOneinDb = (id,callback)=>{
    let sql = `SELECT * FROM tutorials WHERE id = ${id}`
    db.get(sql,[],function(err,row){
        if(err){
            console.log(`"Error getting tutorial with id${id}"`);
            callback(err,null)
            return  
        }
        console.log(`"Tutorial data with id ${id} selected successfully from database"`);
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
            console.log("Error updating in database");
            callback(err,null)
            return
        }
        if(this.changes===1){
            console.log(`"Tutorial data with ${id} updated successfully from database"`);
            let responseData = {id:id, ...data}
            callback(null,responseData)
        }else{
            console.log("No rows affected in updating rows in Database");
            callback(err,null)
        }
    })
    
} 

const deleteInDb = (id,callback)=>{
    let sql = `DELETE FROM tutorials WHERE id = ?`
    db.run(sql,[id],function(err){
        if(err){
            console.log("error in deleting rows in Database");
            callback(err,null)
        }
        if(this.changes===1){
            let responseData = `Data with id ${id} deleted successfully`  
            callback(null,responseData)
        }else{
            console.log("No rows affected in deleting rows in Database");
            callback(err,null)
        }
    })
}

const deleteAllInDb = (callback)=>{
    let sql = `DELETE FROM tutorials`
    db.run(sql,[],function(err){
        if(err){
            console.log("Error in deleting all rows in database");
            callback(err,null)
        }else{
            let responseData =`All rows deleted successfully`
            callback(null,responseData)
        }
    })
}


export {createInDb,getAllInDb,getAllPublishedInDb,findOneinDb,updateInDb,deleteInDb,deleteAllInDb}