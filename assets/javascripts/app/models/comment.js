comments.BB.models.comment = Backbone.Model.extend({
	initialize: function() {
		this.view = new comments.BB.views.comment;
		this.view.model = this;
	}
});