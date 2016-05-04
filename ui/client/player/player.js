/* global playerActive:false*/

Template.player.onRendered(function () {
    'use strict';
//    this.$('input#video-controls').focus();
});

Template.player.helpers({
    baseurl: function () {
        'use strict';
        var tmp = Meteor.absoluteUrl().split(':');
        var url = tmp[0] + ':' + tmp[1] + ':80/';

        return url;
    },

    returnType: function (type) {
        'use strict';

        var text = 'video/';

        if (type === 'mp4') {
            text += 'mp4';
        } else if (type === 'mkv') {
            text += 'webm';
        }

        return text;
    },
});

Template.player.events({
    'mouseenter video#video-player': function (event) {
        'use strict';
        event.currentTarget.setAttribute('controls', 'controls');
    },

    'mouseleave video#video-player': function (event) {
        'use strict';
        event.currentTarget.removeAttribute('controls');
    },
    'play video#video-player': function(){
        'use strict';
        var $input = $("input#video-controls");
        $input.attr("data-status", "play");
//        $input.focus();
    },
    'pause video#video-player': function(){
        'use strict';
        var $input = $("input#video-controls");
        $input.attr("data-status", "pause");
    },
    'focus input#video-controls, keypress input#video-controls': function(event){
        'use strict';
        console.log("hola!");
        var status = $(event.currentTarget).attr("data-status");
        var $video = $("video#jp-video");
        if(status === "pause"){
            $video.get(0).play();
        }else if(status === "play"){
            $video.get(0).pause();
        }
    }
});
