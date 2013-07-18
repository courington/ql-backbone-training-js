comments.BB.collections.comments = Backbone.Collection.extend({
	url: "http://ql-backbone-training-api.herokuapp.com/comments?api_key=davidaragon",
	model: comments.BB.models.comment,
	renderComments: function() {
		$('#comments').empty();
		_.each(this.models, function(comment) {
			comment.view.render();
			comment.view.$el.appendTo('#comments');
		});
	}
});