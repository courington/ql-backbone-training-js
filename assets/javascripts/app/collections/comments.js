comments.BB.collections.comments = Backbone.Collection.extend({
	url: "http://0.0.0.0:3002/comments?api_key=foobar",
	model: comments.BB.models.comment,
	renderComments: function() {
		$('#comments').empty();
		_.each(this.models, function(comment) {
			comment.view.render();
			comment.view.$el.appendTo('#comments');
		});
	}
});