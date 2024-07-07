"Handling Authentication is a crucial part of any web application. You can implement authentication using JWT (JSON Web Token) for the stateless sessions"
"install Dependencies; npm install bcryptjs jsonwebtoken"

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: String,
    password: String, 
});

userSchema.prev ('Save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash (this.password, Salt);
    next ();
}); 

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password); 
};

module.exports = mongoose.model('User', userSchema);

//backend/routes/authRoutes.js 
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async(req, res) => {
    const {username, password} = req.body;
    let user = new User({username, password});
    await user.save();
    const token = jwt.sign({userId: user._id}, 'SECRET_KEY');
    res.json({token});
});

router.post('/login', async(req, async res => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!User) {
        return res.status(400).send('Invalid credentials');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({userId: user._id}, 'SECRET_KEY');
    res.json({token});

}));

module.exports = routers; 