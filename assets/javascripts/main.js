var comments = {
    BB: {
        models: {},
        collections: {},
        views: {}
    }
};

window.comments = comments;

$(document).ready(function() {
    var router = new comments.BB.router();
    Backbone.history.start();
});

