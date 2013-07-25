comments.BB.collections.comments = Backbone.Collection.extend({
	url: "NO_URL_SET",
	model: comments.BB.models.comment,
	renderComments: function() {
		$('#comments').empty();
		_.each(this.models, function(comment) {
			comment.view.render();
			comment.view.$el.appendTo('#comments');
		});
	},

	initialize: function() {
		var _this = this;
		this.on('add', function() {
			_this.renderComments();
		});
	}

});