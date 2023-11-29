const express = require('express') , router=express.Router()
const db=require('../db')
const bodyParser =require("body-parser");

router.get('/get-tasks',async (req,res)=>{
     const sql="SELECT * FROM mytasks"
    db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({success:true,data:results});
    }
  });
});

router.get("/read-task/:id",(req,res)=>{
  const taskId=req.params.id;
   const sql = "SELECT * FROM mytasks WHERE id=?";
   db.query(sql,taskId, (err, result) => {
     if (err) {
       console.error("Error executing query:", err);
       res.status(500).json({ error: "Internal Server Error" });
     } else {
       res.json(result);
     }
   });
})

router.post("/add-task",bodyParser.json(), (req, res) => {
  const  {task,status}  = req.body;
  const values =[task,status]
  const sql = `INSERT INTO mytasks (task,status) values  (?,?)`;  
 db.query(sql,values,(err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res
        .status(201)
        .json({ success: true,data:result });
    }
  });
});

router.put("/update-task/:taskId",bodyParser.json(),(req, res) => {
  const taskId = req.params.taskId;
  const {task,status} = req.body;
 
  let sql ;
  let values;

  if (task !== undefined && status !== undefined) {
      sql = "UPDATE mytasks SET `task`=?, `status`=? WHERE id =?";
      values = [task, status, taskId];
    } else if (task !== undefined) {
      sql = "UPDATE mytasks SET `task`=? WHERE id =?";
      console.log("Hello")
      values = [task, taskId];
    } else if (status !== undefined) {
      sql = "UPDATE mytasks SET `status`=? WHERE id =?";
      values = [status, taskId];
    }

  db.query(sql,values,(err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log('Updated');
      res.status(200).json({ success: true, data:result });
    }
  });
});


router.delete("/delete-task/:id",(req,res)=>{
  const taskId=req.params.id
  const sql = "Delete from mytasks WHERE id =?";

  db.query(sql,taskId, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ success:false,error: "Internal Server Error" });
    } else {
      res.status(200).json({ success: true,data:result });
    }
  });
})
module.exports=router