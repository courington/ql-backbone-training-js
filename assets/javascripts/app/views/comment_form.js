comments.BB.views.comment_form = Backbone.View.extend({
  
  tagName: "li",

  render: function() {
  	this.$el.html(_.template( $('#comment_form_template').html() ));
  },

  events: {
  	'submit form' : 'saveComment'
  },

  saveComment: function(e) {
  	e.preventDefault();

  	var new_comment = new comments.BB.models.comment( {
  		author: $('.author_name').val(),
  		comment: $('.comment_body').val()
  	});
  	
  	// validate new_comment model
  	// new_comment.validate();

  	// add new_comment to collection
  	if (new_comment.isValid()){
  		comments.comments_collection.add(new_comment);
  	} else {
  		alert('you need an author');
  	}

  	// clear input fields
  	$('.author_name').val('');
  	$('.comment_body').val('');
  }

})
