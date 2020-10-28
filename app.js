const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
const cors = require('cors');
app.use(cors());


app.listen(8081);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/extremedelete/:id', actors.deleteExtreme);
app.delete('/actors/:aID/:mID', actors.removeMovie);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.post('/movies/:mID/:aID', movies.addActor);
app.delete('/movies/:mID/:aID', movies.removeActor);
app.get('/movies/:year1/:year2', movies.getSpecific);
app.delete('/movies/removeSpecific/:year1/:year2', movies.removeSpecific);


//Home Page
app.get('/', (req, res) => {
    res.json('Thank you');
});
