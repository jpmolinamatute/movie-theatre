/* global moviesCollection: false */
/* global playerActive:true */
playerActive = new ReactiveVar(false);
Template.movies.helpers({
    playerIsActive: function () {
        'use strict';
        return playerActive.get();
    },

    list: function () {
        'use strict';
        var list = [];
        var tmp = [];
        var index = 0;
        moviesCollection.find({}, { sort: { title: 1 } }).forEach(function (doc) {
            if (index < 5) {
                tmp.push(doc);
                index++;
            } else {
                index = 1;
                list.push({ row: tmp.slice() });
                tmp = [doc];
            }
        });

        list.push({ row: tmp.slice() });
        return list;
    }
});

Template.movies.onRendered(function () {
    'use strict';
    console.log(moviesCollection.find().fetch());

});

Template.movies.events({
    "click div#jp-movies button[data-type='go-to-movie']": function (event) {
        'use strict';
        playerActive.set(this);
        event.stopPropagation();
    },

    'click button#player-back': function (event) {
        playerActive.set(false);
        event.stopPropagation();
    },
});
