/* global moviesCollection: false */
/* global movieActive: false */
moviesCollection.allow({
    insert: function () {
        'use strict';

        return true;
    },

    update: function () {
        'use strict';

        return true;
    },

    remove: function () {
        'use strict';

        return true;
    },
    fetch: ["_id"]
});

moviesCollection.allow({
    insert: function () {
        'use strict';

        return true;
    },

    update: function () {
        'use strict';

        return true;
    },

    remove: function () {
        'use strict';

        return true;
    },
    fetch: ["_id"]
});

movieActive.allow({
    insert: function (userId) {
        "use strict";

        return userId ? true : false;
    },
    update: function (userId, doc) {
        "use strict";

        return doc._id === userId;
    },
    remove: function (userId, doc) {
        "use strict";

        return doc._id === userId;
    },
    fetch: ["_id"]
});

Meteor.publish('movies', function () {
    'use strict';

    return moviesCollection.find();
});

Meteor.publish('genre', function () {
    'use strict';

    return moviesGenre.find();
});

Meteor.publish('active', function () {
    'use strict';
    var user = this.userId;
    if(!movieActive.findOne({_id: user})){
        movieActive.insert({_id: user, movieID: false});
    }
    return movieActive.find({_id: user});
});