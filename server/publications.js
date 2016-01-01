moviesCollection.allow({
    insert: function (userId) {
        "use strict";

        return true;
    },
    update: function (userId, doc) {
        "use strict";

        return true;
    },
    remove: function (userId, doc) {
        "use strict";

        return true;
    }//,
    //fetch: ["_id", "owner"]
});

Meteor.publish("thumbnails", function () {
    "use strict";

    return moviesCollection.find({}, {fields:{"title": 1}});
});

Meteor.publish("movies", function () {
    "use strict";

    return moviesCollection.find({"exists" : true});
});