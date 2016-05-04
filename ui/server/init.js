var targetDir = '/run/media/juanpa/media/thumbnails/';

function finishUpload(fileInfo, formFields){
    'use strict';

    var fs = require('fs');
    fs.rename(targetDir + fileInfo.name, targetDir + formFields.id + ".jpg");
}

Meteor.startup(function () {

    UploadServer.init({
        tmpDir: process.env.PWD + '/public/tmp',
        uploadDir: targetDir,
        checkCreateDirectories: true, //create the directories for you
        overwrite: true,
        finished: finishUpload
    });
});
