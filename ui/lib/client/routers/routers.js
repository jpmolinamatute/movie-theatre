Router.route("/", function () {
    "use strict";
    this.subscribe('movies').wait();
    if (this.ready()) {
        this.render('movies');
    } else{
        this.render('loading');
    }
});


Router.route('/player', function(){
    this.render('player', {
        data: function(){
            console.log(this.params);
            return {'id': this.params.query.id};
        }
    })
});

Router.route('newMovie', function () {
    "use strict";
    this.subscribe('genre');
    this.subscribe('movies').wait();
    if (this.ready()) {
        this.render('newMovie');
    } else{
        this.render('loading');
    }
});
