comments.BB.router = Backbone.Router.extend({
	routes: {
		"": "index"
	},
	index: function(){
		var comments_collection = new comments.BB.collections.comments();
		comments.comments_collection = comments_collection;

		var comment_form_view = new comments.BB.views.comment_form();
			comment_form_view.render();
			comment_form_view.$el.appendTo('body');
      
      comments_collection.reset([
        {author: 'Alex', comment: 'Yo'},
        {author: 'Alex', comment: 'Dear Sir, I am a Nigerian Prince...'},
        {author: 'David', comment: 'One weird trick to...'},
        {author: 'David', comment: 'Cats!'}
      ]);
			comments_collection.renderComments();

	}
});

