BT.Views.EditRelationship = Backbone.CompositeView.extend({
	initialize: function () {};
	
	events: {},
	
	template: JST['backbone/templates/relationship/editRelationship'],
	
	render: function () {
		var renderedContent = this.template({ relationship: this.model });
		this.$el.html(renderedContent);
		return this;
	}
})