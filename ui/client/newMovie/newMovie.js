/* global Uploader: false*/
/* global moviesCollection: false*/


var toEdit = new ReactiveVar(false);
function saveMovie(myID) {
    'use strict';

    var obj;
    var title = $('input#movie-detail-title').val().trim();
    var genre = $('select#movie-detail-genre').val().trim();
    var imdb = $('input#movie-detail-imdb').val().trim();
    var filetype = $('select#movie-detail-filetype').val().trim();

    if (title.length &&
        genre.length &&
        imdb.length &&
        filetype.length
    ) {
        obj = {
            title: title,
            genre: genre,
            filetype: filetype,
            imdbID: imdb
        };

        Meteor.call('updateMovie', {_id: myID}, {$set:obj});
    }
}

Template.newMovie.events({
    'click button#jp-movies-add': function (event) {
        'use strict';

        Meteor.call('updateMovie', {active:true}, {$set:{active:false}},{multi: true}, function(error){
            if(error){
                console.error(error);
            } else{
                moviesCollection.insert({ active:true });
                toEdit.set(true);
            }
        });
        event.stopPropagation();
    },
    'click button#movie-remove': function(event){
        'use strict';
        var id = this._id;
        moviesCollection.remove({_id: id});
        event.stopPropagation();
    },
    'click ul#jp-movies-list button[data-type="list"]': function (event) {
        'use strict';

        var id = this._id;

        moviesCollection.update({_id:id}, {$set:{active:true}});
        Meteor.call('updateMovie', {active:true}, {$set:{active:false}},{multi: true}, function(error){
            if(error){
                console.error(error);
            } else{
                moviesCollection.update({_id:id}, {$set:{active:true}});
            }
        });
        toEdit.set(false);
        event.stopPropagation();
    },

    'click button#movie-action': function (event) {
        'use strict';
        var id = this._id;
        var $button = $(event.currentTarget);
        if ($button.attr('data-action') === 'Edit') {
            toEdit.set(true);
        } else if ($button.attr('data-action') === 'Save'){
            saveMovie(id);
            toEdit.set(false);
        }

        event.stopPropagation();
    }
});

Template.newMovie.helpers({
    list: function () {
        'use strict';
        return moviesCollection.find({}, { sort: { title: 1 } });
    },

    genreList: function () {
        'use strict';
        return moviesGenre.find();
    },

    sameGenre: function (listGender, gender) {
        'use strict';
        return listGender === gender;
    },

    show: function () {
        'use strict';
        return moviesCollection.findOne({active:true});
    },

    edit: function () {
        'use strict';
        return toEdit.get();
    },

    action: function () {
        'use strict';
        return toEdit.get() ? 'Save' : 'Edit';
    },

    actionClass: function () {
        'use strict';
        return toEdit.get() ? 'btn-success' : 'btn-primary';
    }
});

Template.newMovie.onRendered(function () {
    'use strict';
    Meteor.call('updateMovie', {active:true}, {$set:{active:false}},{multi: true});
});
