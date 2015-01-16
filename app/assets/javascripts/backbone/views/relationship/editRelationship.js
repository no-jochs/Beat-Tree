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
		this.model.set(attrs);
		this.model.save({}, { patch: true });
	}
})