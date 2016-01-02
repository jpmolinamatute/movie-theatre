/* global Uploader: false*/
/* global moviesCollection: false*/
var isUpdate = new ReactiveVar(false);


function saveMovie(myID, $tr){
    "use strict";
    var $inputs = $tr.find("input.form-control");
    var obj = {};
    $inputs.each(function(key, value){
        var $field = $(value);
        var index= $field.attr("data-type");
        if($field.val().length){
            obj[index] = $field.val();
        }
    });

    if(!_.isEmpty(obj)){
        moviesCollection.update({_id: myID}, {$set:obj});
    }
    isUpdate.set(false);
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
    "click table#new-list td button[data-action='edit']": function (event) {
        "use strict";
        isUpdate.set(this._id);
        event.stopPropagation();
    },
    "click table#new-list td button[data-action='save']": function (event) {
        "use strict";
        var $tr = $(event.currentTarget).closest("tr");
        saveMovie(this._id, $tr);
        event.stopPropagation();
    },
    "click table#new-list td button[data-action='picture']": function (event){
        "use strict";
        console.log(this);
        event.stopPropagation();
    },
    "keypress table#new-list td input.form-control": function(event){
        "use strict";
        var $tr;
        if(event.which === 13){
            event.preventDefault();
            $tr = $(event.currentTarget).closest("tr");
            saveMovie(this._id, $tr);
        }
    }
});

Template.newMovie.helpers({
    "list": function () {
        "use strict";
        return moviesCollection.find();
    },
    toUpdate: function () {
        "use strict";
        return isUpdate.get() === this._id;
    },
    removeExt: function(movie){
        "use strict";
        return movie.slice(0, -4);
    }
});

Template.newMovie.onRendered(function () {
    "use strict";
    Meteor.subscribe("movies");
    Uploader.uploadUrl = Meteor.absoluteUrl("thumbnails");
    console.log(Uploader.uploadUrl);
});