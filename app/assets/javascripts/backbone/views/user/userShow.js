BT.Views.UserShow = Backbone.CompositeView.extend({
	initialize: function () {},
	
	template: JST['backbone/templates/user/usershow'],
	
	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		this.addRelationships();
		return
	},
	
	addRelationships: function () {
		var that = this;
		_(that.relationships).each ( function (rel) {
			var view = new BT.Views.RelationshipIcon({ model: rel });
			if (rel.escape('type') == "SAMPLES") {
				that.addSubview('.user-samples-container', view);
			} else if(rel.escape('type') == "COVERS") {
				that.addSubview('.user-covers-container', view);
			} else if(rel.escape('type') == "REMIXES") {
				that.addSubview('.user-remixes-container', view);
			}	
		});
	}
	
})