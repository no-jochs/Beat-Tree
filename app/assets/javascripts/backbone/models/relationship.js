BT.Models.Relationship = Backbone.Model.extend({
	initialize: function (options) {
		this.type = options.type;
		this.startNodeId = options.startNodeId;
		this.endNodeId = options.endNodeId;
		this.listenTo(this.model, 'sync', this.render);
	},
	
	url: function () {
		return "api/relationships/" + this.startNodeId +"?type=" + 
				this.type + "&endNodeId=" + this.endNodeId
	},
	
	parse: function (dataJSON) {
		var startNodeData = dataJSON.startNode,
			endNodeData = dataJSON.endNode;
			
		this.startNode = new BT.Models.Track(startNodeData);
		this.endNode = new BT.Models.Track(endNodeData);
		this.set({ id: this.startNode.get('track_spotify_id')});
		
		delete dataJSON.startNode;
		delete dataJSON.endNode;
		
		this.set(dataJSON.rel);	
	}
});