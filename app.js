const express = require('express');
const mongoose = require('mongoose');
const country = require('./schema.js')
const app = express();

mongoose.connect('mongodb+srv://gaulthier:password1234@cluster0.yrxcl.mongodb.net/dbcountry?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Error connection to database'));

app.use(express.json());
app.use(express.urlencoded());

app.get('/country', (req, res, next) => {
    country.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

app.get('/country/:country', (req, res, next) => {
    country.findOne({ country: req.params.country })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

app.post('/country', (req, res, next) => {
    console.log(req.body);
    const object = new country({
        ...req.body
    });
    object.save()
        .then(() => res.status(200).json({ message: 'Country saved'}))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;
