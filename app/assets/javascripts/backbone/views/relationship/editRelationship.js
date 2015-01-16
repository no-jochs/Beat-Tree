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
		var attrs = $('#relationship-update-form').serializeJSON();
		var that = this;
		this.model.save(attrs, {
			success: function (model, response, options) {
				Backbone.history.navigate('#relationship/' + that.startNodeId + 
						'?type=' + that.type + '&endNodeId=' + that.endNodeId,
						{ trigger: true}
				);
				that.model.trigger('sync');
			}
		});
	}
});