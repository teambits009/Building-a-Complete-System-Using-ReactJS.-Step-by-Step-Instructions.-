"Applying middleware to Protected Routes"

const authMiddleware = require ('../middleware/authMiddleware');

router.get('/tasks', authMiddleware, async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post('/tasks', authMioddleware, async(req, res) => {
    const newTask = new Task (req.body);
    await newTask.save();
    res.json (newTask);
});

router.delete('/task/:id',authMiddleware,async(req, res) => {
    await Task.findByIdAndDelete (req.params.id);
    res.json({message: 'Task deleted'});
});