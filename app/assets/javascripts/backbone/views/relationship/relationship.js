BT.Views.Relationship = Backbone.CompositeView.extend({
	initialize: function () {},
	
	events: {
		"click button#update-relationship": "updateRelationship",
		"click button#delete-relationship": "deleteRelationship"
	},
	
	template: JST['backbone/templates/relationship/relationship'],
	
	render: function () {
		var renderedContent = this.template({ relationship: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	
	updateRelationship: function () {
		Backbone.history.navigate( "#relationship/edit/" + this.model.type +
									"/" + this.model.startNodeId + "/" + this.model.endNodeId,
									{ trigger: true}
								);
	},
	
	deleteRelationship: function () {
		this.model.destroy({
			success: function () {
				Backbone.history.navigate('#feed');
			}
		});
	}
});