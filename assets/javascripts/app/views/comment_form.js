comments.BB.views.comment_form = Backbone.View.extend({
	render: function() {
		this.$el.html($('#comment_form_template').html());
	},
	events: {
		'submit form': 'addComment'
	},
	addComment: function(e) {
		var new_comment = new comments.BB.models.comment({author: $('.author_name').val(), comment: $('.comment_body').val()})
		e.preventDefault();
		
		comments.comments_collection.add(new_comment);
		new_comment.save();
		comments.comments_collection.renderComments();
		return false;
	}
})