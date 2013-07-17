comments.BB.views.comment = Backbone.View.extend({
	tagName: "li",
	render: function() {
		this.$el.html(_.template($('#comment_template').html(), this.model.toJSON()));
	}
});