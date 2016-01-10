/* global Uploader: false*/
/* global moviesCollection: false*/

var toShow = new ReactiveVar(false);
var toEdit = new ReactiveVar(false);
function saveMovie(myID) {
    "use strict";

    var obj;
    var title = $("input#movie-detail-title").val().trim();
    var genre = $("input#movie-detail-genre").val().trim();
    var imdb = $("input#movie-detail-imdb").val().trim();
    var filetype = $("input#movie-detail-filetype").val().trim();

    if (title.length &&
        genre.length &&
        imdb.length &&
        filetype.length
    ) {
        obj = {
            "title": title,
            "genre": genre,
            "filetype": filetype,
            "imdbURL": imdb
        };

        moviesCollection.update({_id: myID}, {$set: obj});
    }
}

Template.newMovie.events({
    "submit form#new-movie": function (event) {
        "use strict";

        var obj = {
            title: $(event.target.title).val(),
            imdbURL: $(event.target.imdbURL).val(),
            filename: $(event.target.filename).val(),
            filepath: $(event.target.filepath).val(),
            filetype: $(event.target.filetype).val(),
            genre: $(event.target.genre).val(),
            thumbnailfile: $(event.target.thumbnailfile).val()
        };
        event.preventDefault();
        moviesCollection.insert(obj, function (error, _id) {
            if (error) {
                console.error(error);
                console.log(obj);
            } else if (_id) {
                event.target.reset();
            }
        });
    },
    "click ul#jp-movies-list button[data-type='list']": function (event) {
        "use strict";

        toShow.set(this);
        toEdit.set(false);
        event.stopPropagation();
    },
    "click button#movie-action": function (event) {
        "use strict";
        var $button = $(event.currentTarget);

        if ($button.attr("data-action") === "edit") {
            toEdit.set(true);
        } else {
            saveMovie($button.attr("data-id"));
            toEdit.set(false);
        }
        event.stopPropagation();
    }
});


Template.newMovie.helpers({
    "list": function () {
        "use strict";
        return moviesCollection.find();
    },
    show: function () {
        "use strict";
        return toShow.get();
    },
    edit: function () {
        "use strict";
        return toEdit.get();
    },
    action: function () {
        "use strict";
        return toEdit.get() ? "save" : "edit";
    },
    actionClass: function () {
        "use strict";
        return toEdit.get() ? "btn-success" : "btn-primary";
    }
});

Template.newMovie.onRendered(function () {
    "use strict";
    Meteor.subscribe("newMovie");
    Uploader.uploadUrl = Meteor.absoluteUrl("thumbnails");
});