BT.Views.EditRelationship = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},
	
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
				debugger
				Backbone.history.navigate('#relationship/' + that.model.type + 
						'/' + that.model.startNodeId + '/' + that.model.endNodeId,
						{ trigger: true}
				);
				that.model.fetch();
			}
		});
	}
});