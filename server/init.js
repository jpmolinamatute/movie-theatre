/* global UploadServer: false*/

Meteor.startup(function () {
    "use strict";

    console.log(process.env.PWD + "/public/thumbnails");
    UploadServer.init({
        tmpDir: process.env.PWD + "/public/tmp",
        uploadDir: process.env.PWD + "/public/thumbnails",
        checkCreateDirectories: true,
        //acceptFileTypes: /.jpg$/,
        //maxFileSize: 200000,
        //minFileSize: 5000,
        overwrite: true,
        finished: function(fileInfo, formFields){
            console.log(fileInfo, formFields);
        }
    });
});