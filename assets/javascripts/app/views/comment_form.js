comments.BB.views.comment_form = Backbone.View.extend({
	render: function() {
		this.$el.html($('#comment_form_template').html());
	},
	events: {
		'submit form': 'addComment'
	},
	addComment: function(e) {
		e.preventDefault();
		comments.comments_collection.add({author: $('.author_name').val(), comment: $('.comment_body').val()});
		comments.comments_collection.renderComments();
		return false;
	}
})