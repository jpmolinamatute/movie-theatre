Router.route("/", function () {
    "use strict";
    this.subscribe('movies').wait();
    if (this.ready()) {
        this.render('movies');
    } else{
        this.render('loading');
    }
});

Router.route('newMovie', function () {
    "use strict";
    this.subscribe('active');
    this.subscribe('genre');
    this.subscribe('movies').wait();
    if (this.ready()) {
        this.render('newMovie');
    } else{
        this.render('loading');
    }
});
