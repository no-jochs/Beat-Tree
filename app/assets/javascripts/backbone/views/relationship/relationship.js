BT.Views.Relationship = Backbone.CompositeView.extend({
	initialize: function () {},
	
	template: JST['backbone/templates/relationship/relationship'],
	
	render: function () {
		var renderedContent = this.template({ relationship: this.model });
		this.$el.html(renderedContent);
		return this;
	}
})