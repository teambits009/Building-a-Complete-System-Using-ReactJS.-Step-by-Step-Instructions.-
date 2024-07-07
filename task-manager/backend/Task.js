const mongoose = require ('mongoose');

const taskSchema = new mongoose.Schema({
    title:String,
    description: String,
    completed: Boolean, 

});

module,exports=mongoose.model ('Task', taskSchema);

//backend/routes/taskRoutes.js
const express = require('express');
const Task = require ('../models/Task');
const router = express.Router();

router.get ('/task', async(req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res,json(newTask);
});

router.delete('/task/:id', async (req, res)=> {
    await Task.findByIdAndDelete(req.params.id);
    res.json({message: 'Task deleted'});
});

module.exports=router;