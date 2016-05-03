Router.configure({
    loadingTemplate: "loading",
    notFoundTemplate: "notfound",
    layoutTemplate: "main"
});

Router.onBeforeAction(function (req, res, next) {
    'use strict';
    var opt;
    if (Meteor.userId()) {
        next();
    } else {
        opt = {};
        Meteor.loginWithGoogle(opt, function(error){
            if(error){
                console.error(error);
            } else {
                next();
            }
        });
    }
});