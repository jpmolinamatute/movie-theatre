/* global moviesCollection: false */
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
    }//,
    //fetch: ["_id", "owner"]
});

Meteor.publish('movies', function () {
    'use strict';

    return moviesCollection.find();
});

Meteor.publish('genre', function () {
    'use strict';

    return moviesGenre.find();
});
