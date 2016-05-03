/* global moviesCollection: false */
/* global playerActive:true */
playerActive = new ReactiveVar(false);

Template.movies.helpers({
    playerIsActive: function (){
        'use strict';
        return playerActive.get();
    },

    list: function (){
        'use strict';

        var result;
        var top         = 0;
        var left        = 0;
        var width       = 1200;
        var imageHeight = 357;
        var imageWidth  = 254;


        result = moviesCollection.find({}, {sort: {title: 1}}).map(function (doc){
            var currentHeight = top * imageHeight;
            var currentWidth  = left * imageWidth;
            if (currentWidth >= width) {
                top++;
                left          = 0;
                currentHeight = top * imageHeight;
                currentWidth  = left * imageWidth
            }
            doc.top  = currentHeight + "px";
            doc.left = currentWidth + "px";
            left++;
            return doc;
        });

        return result;
    }
});

Template.movies.onRendered(function (){
    'use strict';
});

Template.movies.events({
    'click div#jp-movies button[data-type="go-to-movie"]': function (event){
        'use strict';
        playerActive.set(this);
        event.stopPropagation();
    },

    'click button#player-back': function (event){
        playerActive.set(false);
        event.stopPropagation();
    },
});
