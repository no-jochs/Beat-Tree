BT.Views.NewUser = Backbone.CompositeView.extend({
	initialize: function () {
		this.model = new BT.Models.User;
	},
	
	events: {
		"click .sign-up-btn": "signUp"
	},
	
	template: JST['backbone/templates/user/newUser'],
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	
	signUp: function (event) {
		event.preventDefault();
		var userData = $('.new-user-data').serializeJSON();
		debugger
		this.model.set(userData);
		this.model.save({}, {
			success: function (model, response, options) {
				Backbone.history.navigate('#welcome', { trigger: true });
			},
			error: function (model, response, options) {
				alert('There was a problem with your submission.  Please refresh the page and try again.');
			}
		});
	}
});