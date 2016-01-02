/* global UploadServer: false*/

Meteor.startup(function () {
    "use strict";

    UploadServer.init({
        tmpDir: process.env.PWD + "/public/tmp",
        uploadDir: process.env.PWD + "/public/thumbnails",
        checkCreateDirectories: false,
        acceptFileTypes: /.jpg$/,
        maxFileSize: 200000,
        minFileSize: 5000,
        overwrite: true,
        finished: function(arg1){
            console.log(arg1);
        }
    });
});