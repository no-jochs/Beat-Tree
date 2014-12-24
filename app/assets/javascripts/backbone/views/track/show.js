BT.Views.TrackShow = Backbone.CompositeView.extend({
	initialize: function () {
		
	},
	
	template: JST['backbone/templates/track/show'],
	
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent)
		return this;
	}
})