/*global moviesCollection*/
function updateMovie(selector, modifier, options){
    'use strict';
    if(options === undefined){
        options = {};
    }
    moviesCollection.update(selector, modifier, options);
}

Meteor.methods({
    updateMovie: updateMovie
});
