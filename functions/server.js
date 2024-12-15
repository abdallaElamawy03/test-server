const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS
const router = express.Router();


// router.get('/', (req, res) => {
//   res.send("he")
// });

router.post('/add', (req, res) => {
  res.send('New record added.');
});

router.delete('/', (req, res) => {
  res.send('Deleted existing record');
});

router.put('/', (req, res) => {
  res.send('Updating existing record');
});

router.get('/demo', (req, res) => {
  res.json([
    { id: '001', name: 'Aayush' },
    { id: '002', name: 'Rohit' },
    { id: '003', name: 'Mohit' },
  ]);
});
const db =[{
    name:"abdalla",
    id:"7",
    grade:"6"

},{
    name:"abdalla",
    id:"6",
    grade:"5"
}]


router.get("/",(req,res)=>{
    try{
          // Destructure to exclude 'grade'
        const {grade,...rest}=db
        res.json({rest})
    }catch(err){
        console.log(err.msg)
    }
})
router.put("/", (req, res) => {
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
router.put("/update",(req,res)=>{//update with index cause there is no db 
try{

    const index = 1
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
router.delete("/", (req, res) => {
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
router.post("/",(req,res)=>{
    db.unshift({name:"abdalla",id:"06",grade:"5"})
    res.json(db)
        
    
})


// Use the router for Netlify functions
app.use('/.netlify/functions/server', router); // Ensure this matches the function name
module.exports.handler = serverless(app);