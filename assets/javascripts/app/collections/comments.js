comments.BB.collections.comments = Backbone.Collection.extend({
	model: comments.BB.models.comment,
	renderComments: function() {
		$('#comments').empty();
		_.each(this.models, function(comment) {
			comment.view.render();
			comment.view.$el.appendTo('#comments');
		});
	}
});