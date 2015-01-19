BT.Views.GraphView = Backbone.CompositeView.extend({
	initialize: function () {},
	
	template: JST['backbone/templates/graphView/graphView'],
	
	events: {
		"click button#most-sampled": "mostSampled",
		"click button#most-covered": "mostCovered",
		"click button#most-remixed": "mostRemixed",
		"click button#lots-o-samples": "lotsOfSamples",
		"click button#lone-nodes": "loneNodes",
		"click button#mother-o-drums": "motherOfDrums",
		"click button#popularity": "popularity",
		"click button#track-subgraph": "trackSubgraph",
		"click button#path-search": "pathSearch"
	},
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	
	mostSampled: function () {
		var that = this;
		if (!this.mostSampledData) {
			$.ajax({
				$.ajax({
					type: "GET",
					url: "http://www.beat-tree.com/api/neojson?query_type=most-sampled"
				}).done( function (jsonResp) {
					that.fillGraph(jsonResp);
				});
			})
		}
	},
	
	fillGraph: function (jsonData) {
		
	}
})