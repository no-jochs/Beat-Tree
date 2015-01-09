BT.Views.SignIn = Backbone.CompositeView.extend({
	initialize: function () {},
	
	events: {
		"click .sign-in-btn": "signIn"
	},
	
	template: JST['backbone/templates/user/signIn'],
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	
	signIn: function (event) {
		var user = $('.sign-in-data').serializeJSON();
		$.ajax({
			type: "POST",
			url: "www.beat-tree.com/api/session",
			data: user,
			success: function () {
				Backbone.history.navigate('#search', { trigger: true });
			},
			error: function () {
				alert('Invalid name or password.');
			}
		});
	}
});