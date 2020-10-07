const express = require('express');
const mongoose = require('mongoose');
const user = require('./schema.js')
const app = express();

mongoose.connect('mongodb+srv://admin:admin123@cluster0.lhnu2.mongodb.net/user',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Error connection to database'));

app.use(express.json());

app.post('/login', async (req, res, next) => {
    const reqUser = await user.findOne({ mail: req.body.mail})
        if (reqUser.password === req.body.password) {
            res.status(200).json({"message": "OK"});
        } else {
            res.status(403).json({"message": "Wrong id or password"})
        }
        res.status(404).json();
});

app.post('/register', (req, res, next) => {
    const object = new user({
        ...req.body
    });
    object.save()
        .then(() => res.status(201).json({ message: 'User saved'}))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;
