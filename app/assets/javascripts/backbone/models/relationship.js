BT.Models.Relationship = Backbone.Model.extend({
	initialize: function () {},
	
	parse: function (dataJSON) {
		var startNodeData = dataJSON.startNode,
			endNodeData = dataJSON.endNode;
			
		this.startNode = new BT.Models.Track(startNodeData);
		this.endNode = new BT.Models.Track(endNodeData);
		
		delete dataJSON.startNode;
		delete dataJSON.endNode;
		
		this.set(dataJSON.rel);	
	}
});