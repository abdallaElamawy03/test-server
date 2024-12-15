const express = require("express")
const app = express()
const port = process.env.port || 3500
app.use(express.json()) // this is to request from the body

app.listen(port,()=>{
    console.log(`the server is working in ${port}`)
})
const db =[{
    name:"abdalla",
    id:"7",
    grade:"6"

},{
    name:"abdalla",
    id:"6",
    grade:"5"
}]


app.get("/",(req,res)=>{
    try{
          // Destructure to exclude 'grade'
        const {grade,...rest}=db
        res.json({rest})
    }catch(err){
        console.log(err.msg)
    }
})
app.put("/", (req, res) => {
    // Assuming the request body is an object with 'name' and 'grade' properties
    
    const{name,grade}=req.body

    // Check if the provided name or grade is different from the current values
    try{


        if (name !== db.name || grade !== db.grade) {
            db.name = name; // Update name
            db.grade = grade; // Update grade
            
        }
        console.log("successfully ")
    }catch(err){
        console.log(err.msg)
        

    }

    // Send the updated db object as the response
    res.json(db);
});
app.put("/update",(req,res)=>{//update with index cause there is no db 
try{

    const index = 3
    const {name , grade , id}=req.body
    const indexed = db[index]
    if(index <0 || index > db.length){
        return res.json({msg:"the index is out of "})
    }
    if(name || grade || id !== indexed.name || indexed.grade || indexed.id){
        db[index].name=name
        db[index].grade=grade
        db[index].id=id
        return res.json({msg:"successfully updated",db})
        
    }else{
        db.unshift({name,grade,id})
    }
    

}catch(err){
    res.json({msg:"error while updating"})
    // reres.status(500).json({err:"error"})
    // console.log(err.msg)
}
    
    
})
app.delete("/", (req, res) => {
    try {
        // Clear the db object
        db.name = null; // or delete db.name;
        db.grade = null; 
        db.id=null// or delete db.grade;

        // Optionally, you can delete the entire object
        // Object.keys(db).forEach(key => delete db[key]);

        res.json({ message: "Data removed", db }); // Send response with updated db
    } catch (err) {
        console.log(err.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error" }); // Send error response
    }
});
app.post("/",(req,res)=>{
    db.unshift({name:"abdalla",id:"06",grade:"5"})
    res.json(db)
        
    
})