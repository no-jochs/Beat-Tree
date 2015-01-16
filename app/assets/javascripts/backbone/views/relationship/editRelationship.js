BT.Views.EditRelationship = Backbone.CompositeView.extend({
	initialize: function () {},
	
	events: {
		"click #submit-update-relationship-form": "submitForm"
	},
	
	template: JST['backbone/templates/relationship/editRelationship'],
	
	render: function () {
		var renderedContent = this.template({ relationship: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	
	submitForm: function (event) {
		event.preventDefault();
		
		debugger
		
		var attrs = $('#relationship-update-form').serializeJSON();
		this.model.save(attrs, {
			success: function (model, response, options) {
				Backbone.history.navigate('#relationship/' + this.startNode.get('track_spotify_id') + 
						'?type=' + this.type + '&endNodeId=' + this.endNode.get('track_spotify_id'),
						{ trigger: true}
				);
			}
		});
	}
});