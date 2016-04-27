Router.route("/", function () {
    "use strict";
    this.render("movies");
});


Router.route("/player", function(){
    this.render("player", {
        data: function(){
            console.log(this.params);
            return {"id": this.params.query.id};
        }
    })
});

Router.route("newMovie");
