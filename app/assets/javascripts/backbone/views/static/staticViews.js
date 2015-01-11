BT.Views.LearnMore = Backbone.CompositeView.extend({
	initialize: function () {},
	
	template: JST['backbone/templates/static/LearnMore'],
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
	
});

BT.Views.Splash = Backbone.CompositeView.extend({
	initialize: function () {},
	
	template: JST['backbone/templates/static/Splash'],
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
})