const mongoose = require('mongoose');
const actor = require('../models/actor');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {

      
        query_empty = Object.keys(req.query).length === 0 && req.query.constructor === Object;

        if (query_empty) {
            Actor.find({}).populate('movies').exec(function (err, actors) {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.json(actors);
                }
            });
        }

        else {

            min_age = req.query.min_age;
            max_age = req.query.max_age;

            if (isNaN(min_age) || isNaN(max_age)) {
                res.json('Invalid input');
                return;
            }

            else {
                min_age = 2020 - parseInt(req.query.min_age);
                max_age = 2020 - parseInt(req.query.max_age);
                Actor.where('bYear').gte(max_age).lte(min_age).exec(function (err, docs) {
                    res.json(docs);
                    return;
                });
            }
        }
        


        

    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {

            if (err) return res.status(400).json(err);
            res.json();
        });
        
        Movie.updateMany( 
            {}
         )

    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
    
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
               
                actor.movies.push(movie._id);
                actor.save(function (err) {
                   
                    res.json(actor);
                });
            })
        });
    },

    deleteExtreme: function(req, res) {
        actorId = req.params.id;

        Actor.findOne({ _id: actorId}, function(err, result) {
            console.log(result.movies.length);

            let i=0;
            for (i=0; i<result.movies.length; i++) {

                Movie.findByIdAndDelete({
                    _id: result.movies[i]
                }, function (err, result) {
                });

            }
        });

        Actor.findByIdAndDelete({
            _id: actorId
        }, function (err, result) {
            if (!err)
                res.json(result);
            else res.json(err);
        });
        

    },

    removeMovie: function (req, res) {
        let actorID = req.params.aID;
        let movieID = req.params.mID;

        Actor.findByIdAndUpdate({
            _id: req.params.aID
        }, {
            $pull: {
                "movies": mongoose.Types.ObjectId(movieID)
            }
        }, {
            upsert: false
        }, function (err, data) {
            if (err) {
                res.json(err);
            } else res.json(data);
        })
    }

}