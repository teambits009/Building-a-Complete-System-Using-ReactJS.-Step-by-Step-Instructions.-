const express = require('express');
const mongoose = require('mongoose');
const app = express();
const taskRoutes = require ('./routes/taskRoutes');

mongoose.connect('mongodb://localhost:27017/task-manager', {useNewUrlParser: true, useUnifiedTopology:True});

app.use (express.json());
app.use ('/api', taskRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});