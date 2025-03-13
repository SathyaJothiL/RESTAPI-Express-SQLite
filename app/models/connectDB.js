import sqlite3 from 'sqlite3'
const sql3 = sqlite3.verbose()

//create database or read/write to database

let db = new sql3.Database('MYdb.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,(err)=>{
            if(err){
                console.log("Error in DB");
                console.log(err.message);
                return                
            }
            console.log("Created or opened my db");       
})


let sql = `CREATE TABLE IF NOT EXISTS tutorials(
    id INTEGER NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    published BOOLEAN DEFAULT 0
)`

db.run(sql,[],(err)=>{
    if(err){
        console.log("Error while creating tables",);
        console.log(err.message);
        return
    }
    console.log("Created tables succesfully"); 
})



export default db