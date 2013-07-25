comments.BB.models.comment = Backbone.Model.extend({
	
	initialize: function() {
		this.view = new comments.BB.views.comment;
		this.view.model = this;
	},

	validate: function(attrs) {
		var errors = [];
		if ( attrs.author == '' ) {
			errors.push('you need need an author');
		}
		if ( errors.length > 0) {
			console.log( errors );
			return errors;
		}
	}

});