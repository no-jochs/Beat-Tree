BT.Views.Relationship = Backbone.CompositeView.extend({
	initialize: function () {},
	
	events: {
		"click button#update-relationship": "updateRelationship"
	},
	
	template: JST['backbone/templates/relationship/relationship'],
	
	render: function () {
		var renderedContent = this.template({ relationship: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	
	updateRelationship: function () {
		Backbone.history.navigate( "#relationship/edit/" + this.type +
									"/" + this.startNodeId + "/" + this.endNodeId,
									{ trigger: true}
								);
	}
})