
Template.thelistpage.helpers({
    currentListMovies: function() {
        return Movies.find({
            $or: [ { endDate: { $gte: new Date() } }, { endDate: null } ],
            releaseDate: {$lt: new Date()},
        }, {sort: { releaseDate: 1 }});
    },
    comingSoonListMovies: function() {
        return Movies.find({
            releaseDate: {$gte: new Date()},
        }, {sort: { releaseDate: 1 }});
    },
    unconfirmedListMovies: function() {
        return Movies.find({rumoured: true});
    },
    allMovies: function() {
        return Movies.find({}, {sort: { title: 1 }});
    }
})

Template.thelistpage.onRendered(function() {
    $('.dimmable.image').dimmer({
        on: 'hover'
    });
    changeMenuTabs('#nav-thelist');
});

Template.listMovie.helpers({
    "release": function(){
        if (this.releaseDate) {
            var m = moment(this.releaseDate).utc();
            return moment(m).format("MMMM Do YYYY");
        } else {
            return false;
        }
    }
});