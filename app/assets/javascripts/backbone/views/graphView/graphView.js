BT.Views.GraphView = Backbone.CompositeView.extend({
	initialize: function () {},
	
	template: JST['backbone/templates/graphView/graphView'],
	
	events: {},
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
})