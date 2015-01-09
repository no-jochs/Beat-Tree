BT.Views.LearnMore = Backbone.CompositeView.extend({
	initialize: function () {},
	
	template: JST['backbone/templates/static/learnMore'],
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
	
})