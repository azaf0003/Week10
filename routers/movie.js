var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    
        
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        let movieID =  req.params.id;
        Movie.findOneAndRemove({ _id: movieID}, function (err) {
            res.json();
        });


    },

    addActor: function (req, res) {
        let movieId = req.params.mID;
        let actorId = req.params.aID;
        Movie.findByIdAndUpdate({
            _id: movieId,
        }, {
            $push: {
                "actors": mongoose.Types.ObjectId(actorId)
            }
        }, {
            upsert: false
        }, function (err, data) {
            if (err) {
                res.json(err);
            } else res.json(data);
        })
    },

    removeActor: function (req, res) {
        let movieId = req.params.mID;
        let actorId = req.params.aID;

        Movie.findByIdAndUpdate({
            _id: movieId
        }, {
            $pull: {
                "actors": mongoose.Types.ObjectId(actorId)
            }
        }, {
            upsert: false
        }, function (err, data) {
            if (err) {
                res.json(err);
            } else res.json(data);
        })
    },

    getSpecific: function (req, res) {
        let year1 = parseInt(req.params.year1);
        let year2 = parseInt(req.params.year2);

        Movie.where('year').gte(year1).lte(year2).exec(function (err, docs) {
            res.json(docs);
        });
    },

    removeSpecific: function (req, res) {
        let year1 = parseInt(req.params.year1);
        let year2 = parseInt(req.params.year2);

        Movie.deleteMany({ $and: [ {year: {$gte: year1 }}, {year: { $lte: year2 }}]}, function (err, obj) {
            res.json(obj);
          });
    }
};