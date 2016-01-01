/* global playerActive:false*/

Template.player.onRendered(function(){
    "use strict";

});

Template.player.helpers({
    "baseurl": function(){
        "use strict";
        var tmp = Meteor.absoluteUrl().split(":");
        var url = tmp[0] + ":" + tmp[1] + ":80/";

        return url;
    },
    "returnType": function(type){
        var text = "video/";

        if(type === "mp4"){
            text += "mp4";
        } else if(type == "mkv"){
            text += "webm"
        }

        return text;
    }
});

Template.player.events({
    "click button#player-back": function(event){
        playerActive.set(false);
        event.stopPropagation();
    }
});