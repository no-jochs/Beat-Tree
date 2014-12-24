BT.Views.trackSearch = Backbone.View.extend({
	initialize: function () {
		
	},
	template: JST['backbone/templates/search/track'],
	className: 'search',
	events: {
		'submit': 'doSearch'
	},
	render: function () {
		debugger
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
})