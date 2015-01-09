BT.Views.Splash = Backbone.CompositeView.extend({
	initialize: function () {},
	
	template: JST['backbone/templates/static/splash'],
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
})