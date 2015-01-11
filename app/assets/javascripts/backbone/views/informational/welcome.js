BT.Views.Welcome = Backbone.CompositeView.extend({
	initialize: function () {},
	template: JST['backbone/templates/informational/welcome'],
	events: {
		"click .find-a-track": "findATrack"
	},
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	findATrack: function (event) {
		Backbone.history.navigate('#search', { trigger: true });
	}
})