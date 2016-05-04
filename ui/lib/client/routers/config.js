Router.configure({
    loadingTemplate: "loading",
    notFoundTemplate: "notfound",
    layoutTemplate: "main"
});


Router.onBeforeAction(function (req, res, next) {
    'use strict';

    if (Meteor.userId()) {
        next();
    } else {
        this.render("loginButtons");
    }
});
