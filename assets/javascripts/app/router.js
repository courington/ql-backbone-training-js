comments.BB.router = Backbone.Router.extend({
	routes: {
		"": "index"
	},
	index: function(){
		var comments_collection = new comments.BB.collections.comments([
			{author: "Joe", comment: "This is Joe's comment."},
			{author: "Mary", comment: "This is Mary's comment."},
			{author: "Fred", comment: "This is Fred's comment."}
		]);
		comments.comments_collection = comments_collection;

		var comment_form_view = new comments.BB.views.comment_form();
			comment_form_view.render();
			comment_form_view.$el.appendTo('body');

		comments_collection.renderComments();

	}
});

