var galleryFocus = new ReactiveVar([]);

Template.list.helpers({
    thumbnails: function(){
        "use strict";
        return moviesCollection.find();
    },
    removeExt: function(file){
        "use strict";
        return file.split("/")[1].split(".")[0];
    }
});

Template.list.onRendered(function(){
    "use strict";
    Meteor.subscribe("thumbnails");
});

Template.list.events({
    "click button#move-left": function(event){
        "use strict";
        event.stopPropagation();
    },
    "click button#move-right": function(event){
        "use strict";
        event.stopPropagation();
    }
});
