BT.Views.TrackShow = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},
	
	template: JST['backbone/templates/track/show'],
	
	render: function () {
		debugger
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent)
		return this;
	}
})