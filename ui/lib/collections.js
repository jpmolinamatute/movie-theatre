/* global moviesCollection: true */
/* global moviesGenre: true */
/* global movieActive: true */
moviesCollection = new Mongo.Collection("movies");
moviesGenre = new Mongo.Collection("genre");
movieActive = new Mongo.Collection("active");
