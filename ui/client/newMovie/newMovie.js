/* global moviesCollection: false*/
/* global movieActive: false*/


var toEdit = new ReactiveVar(false);
function saveMovie(myID){
    'use strict';

    var obj;
    var title    = $('input#movie-detail-title').val().trim();
    var genre    = $('select#movie-detail-genre').val();
    var imdb     = $('input#movie-detail-imdb').val().trim();
    var filetype = $('select#movie-detail-filetype').val();

    if (title.length &&
        genre.length &&
        imdb.length &&
        filetype.length
    ) {
        obj = {
            title:    title,
            genre:    genre,
            filetype: filetype,
            imdbID:   imdb
        };

        Meteor.call('updateMovie', {_id: myID}, {$set: obj});
    }
}

Template.newMovie.events({
    'click button#jp-movies-add':                       function (event){
        'use strict';

        Meteor.call('updateMovie', {active: true}, {$set: {active: false}}, {multi: true}, function (error){
            if (error) {
                console.error(error);
            } else {
                moviesCollection.insert({active: true});
                toEdit.set(true);
            }
        });
        event.stopPropagation();
    },
    'click button#movie-remove':                        function (event){
        'use strict';
        var id = this._id;
        moviesCollection.remove({_id: id});
        event.stopPropagation();
    },
    'click ul#jp-movies-list button[data-type="list"]': function (event){
        'use strict';

        var id   = this._id;
        var user = Meteor.userId();
        movieActive.update({_id: user}, {$set: {movieID: id}});
        toEdit.set(false);
        event.stopPropagation();
    },

    'click button#movie-action': function (event){
        'use strict';
        var id      = this._id;
        var $button = $(event.currentTarget);
        if ($button.attr('data-action') === 'Edit') {
            toEdit.set(true);
        } else if ($button.attr('data-action') === 'Save') {
            saveMovie(id);
            toEdit.set(false);
        }

        event.stopPropagation();
    }
});

Template.newMovie.helpers({
    list: function (){
        'use strict';
        return moviesCollection.find({}, {sort: {title: 1}});
    },
    specificFormData: function (){
        'use strict';
        return {
            id: this._id,
            hard: 'Lolcats'
        }
    },
    genreList: function (){
        'use strict';
        return moviesGenre.find({}, {sort: {_id: 1}});
    },
    error: function(flags){
        'use strict';
        return flags.length > 0
    },
    sameGenre: function (listGender, genre){
        'use strict';

        return listGender.indexOf(genre) !== -1;
    },
    sameFileType: function(unmutable, variable){
        'use strict';
        return unmutable === variable;
    },
    show: function (){
        'use strict';
        var user = Meteor.userId();
        var id = movieActive.findOne({_id:user});
        var result = false;
        if(id){
            result = moviesCollection.findOne({_id: id.movieID});
        }
        return result;
    },

    edit: function (){
        'use strict';
        return toEdit.get();
    },

    action: function (){
        'use strict';
        return toEdit.get() ? 'Save' : 'Edit';
    },

    actionClass: function (){
        'use strict';
        return toEdit.get() ? 'btn-success' : 'btn-primary';
    }
});

Template.newMovie.onRendered(function (){
    'use strict';
    Meteor.call('updateMovie', {active: true}, {$set: {active: false}}, {multi: true});
});
