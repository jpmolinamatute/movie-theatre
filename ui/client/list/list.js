/* global moviesCollection: false*/
var playerActive = new ReactiveVar(false);
Template.list.helpers({
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

Template.list.onRendered(function () {
    'use strict';

});

Template.list.events({
    'click div#jp-movies button[data-type="go-to-movie"]': function (event){
        'use strict';
        playerActive.set(this);
        event.stopPropagation();
    },

    'click button#player-back': function (event){
        playerActive.set(false);
        event.stopPropagation();
    },
    'change ul#video-flags li input': function(event){
        'use strict';
        var $input = $(event.currentTarget);
        var obj = {};
        if ($input.is(":checked")) {
            obj.$push = {flags: $input.val()};
        } else{
            obj.$pull = {flags: $input.val()};
        }

        moviesCollection.update({_id: this._id}, obj);
    }
});
