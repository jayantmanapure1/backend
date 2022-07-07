const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()

const app = express()
const Task = require("./model/Task")

const PORT = process.env.PORT|| 5000;
app.use(express.json())
//let tasks = []

 mongoose.connect( process.env.MONGODB_URI ,()=>{
   console.log("Connected to mongoDB Database.....");

 })


//create a task
/*app.post('/tasks', (req, res) => {
   const task = {
      'id': req.body.id,
      'title': req.body.title,
      'description': req.body.description,
      'priority': req.body.priority,
      'emoji': req.body.emoji,
   }
   tasks.push(task);
   res.json({
      'status': 'success',
      'data': task

   })
})*/

app.post("/tasks",async(req,res)=>{

   const task = new Task({
      'id': req.body.id,
      'title': req.body.title,
      'description': req.body.description,
      'priority': req.body.priority,
      'emoji': req.body.emoji,
   })
   const savedTask = await task.save();
   res.json({
      'status': 'success',
      'data': savedTask

   })

})

//to read a task
/*app.get('/tasks', (req, res) => {
   res.json({
      'status': 'success',
      'data': tasks
   })
})*/
app.get('/tasks', async(req, res) => {
   const allTasks = await Task.find()
   res.json({
      'status': 'success',
      'data': allTasks
   })
})

//read a specific task
/*app.post('/get_task', (req, res) => {
   const id = req.body.id;

   let resultTask;
   tasks.map((task) => {
      if (task.id === id) {
         resultTask = task;
      }
   })
   res.json({
      'status': 'success',
      'data': resultTask
   })
})*/
app.post('/get_task', async(req,res)=>{
   const id = req.body.id;
   let specificTask = await Task.findOne({id:id});
   res.json({
      'status': 'success',
      'data': specificTask
   })

})
//delete all task 
/*app.post('/delete_task', (req, res) => {
   tasks = []
   res.json({
      'status': 'success',
      'data': tasks
   })
})*/
app.post('/delete_task' , async(req,res)=>{
   const result = await Task.deleteMany();

   res.json({
      'status': 'success',
      'data': result
   })
})
//delete a specific task
/*app.post('/delete', (req, res) => {
   const id = req.body.id;

   let index = -1;

   tasks.map((task, i) => {
      if (id === task.id) {
         index = i;
      }
   })

   tasks.splice(index, 1)

   res.json({
      'status': 'success',
      'data': tasks
   })

})*/
app.post('/delete', async(req,res)=>{
   const id = req.body.id;
   const result = await Task.deleteOne({id:id})

   res.json({
      'status': 'success',
      'data': result
   })
})

//update task
/*app.post('/update_task',(req,res)=>{
   const id = req.body.id;
   const title = req.body.title;
   const description =req.body.description;
   const priority= req.body.priority;
   const emoji= req.body.emoji;

   let index = -1;
   tasks.map((task,i)=>{
      if(id === task.id){
         index =i;
      }
   })
   tasks [index]={
      'id': id,
      'title':title,
      'description': description,
      'priority': priority,
      'emoji': emoji,
   }
   res.json({
      'status':"success",
      'data':tasks
   })
})*/
app.post('/update_task',async(req,res)=>{
   const id = req.body.id;
   const title = req.body.title;
   const description =req.body.description;
   const priority= req.body.priority;
   const emoji= req.body.emoji;

   const updateResult = await Task.updateOne({id:id},{$set: {
         title:title,
         description:description,
         priority:priority,
         emoji:emoji
   }})
   res.json({
      'status':"success",
      'data':updateResult
   })
})

app.listen(PORT, () => {
   console.log("Server started running on port", PORT);
   
})