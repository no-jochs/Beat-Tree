BT.Models.Relationship = Backbone.Model.extend({
	initialize: function (options) {
		this.type = options.type;
		this.startNodeId = options.startNodeId;
		this.endNodeId = options.endNodeId;
	},
	
	urlRoot: function () {
		return "http://www.beat-tree.com/api/relationships?type=" + 
				this.type + "&startNodeId=" + this.startNodeId +
				"&endNodeId=" + this.endNodeId
	},
	
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