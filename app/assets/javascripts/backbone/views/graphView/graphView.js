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
		
		var title = "Most Sampled Tracks",
			info = "Showing the top 5 most sampled tracks in the BeatTree database along with the tracks that sample them.";
		if (!this.mostSampledData) {
			$.ajax({
				type: "GET",
				url: "api/neojson?query_type=most-sampled"
			}).done( function (jsonResp) {
				that.mostSampledData = jsonResp;
				that.fillGraph(that.mostSampledData, title, info);
			});
		} else {
			this.fillGraph(this.mostSampledData, title, info);
		}
	},
	
	fillGraph: function (data, title, info) {
		BT.Utils.GVD3(this, data, title, info);
	}
})