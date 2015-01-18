BT.Models.User = Backbone.Model.extend({
	
	initialize: function () {
		this.relationships = [];
		this.relationshipCount = 0;
	},
	
	idAttribute: "username",
	
	urlRoot: function () { return "api/users" + this.id },
	
	parse: function (jsonResp) {
		var that = this;
		
		if (jsonResp.relationships) {
			_(jsonResp.relationships).each ( function (relObj) {
				options = {};
				options['type'] = relObj.type
				
				options.startNode = new BT.Models.Track;
				options.startNode.set(relObj.startNode.track);
				
				options.endNode = new BT.Models.Track;
				options.endNode.set(relObj.endNode.track);
				
				that.relationships.push(new BT.Models.Relationship(options));
				that.relationshipCount++
			});
			delete jsonResp.relationships;
		}
		
		return jsonResp;
	}
});