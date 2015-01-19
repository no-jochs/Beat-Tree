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
	
	mostCovered: function () {
		var that = this;
		
		var title = "Most Covered Tracks",
			info = "Showing the top 5 most covered tracks in the BeatTree database along with the tracks that cover them.";
		if (!this.mostCoveredData) {
			$.ajax({
				type: "GET",
				url: "api/neojson?query_type=most-covered"
			}).done( function (jsonResp) {
				that.mostCoveredData = jsonResp;
				that.fillGraph(that.mostCoveredData, title, info);
			});
		} else {
			this.fillGraph(this.mostCoveredData, title, info);
		}
	},
	
	mostRemixed: function () {
		var that = this;
		
		var title = "Most Remixed Tracks",
			info = "Showing the top 5 most remixed tracks in the BeatTree database along with the tracks that cover them.";
		if (!this.mostRemixedData) {
			$.ajax({
				type: "GET",
				url: "api/neojson?query_type=most-remixed"
			}).done( function (jsonResp) {
				that.mostRemixedData = jsonResp;
				that.fillGraph(that.mostRemixedData, title, info);
			});
		} else {
			this.fillGraph(this.mostRemixedData, title, info);
		}
	},
	
	lotsOfSamples: function () {
		var that = this;
		
		var title = "Tracks That Sample the Most",
			info = "Showing the top 5 which sample the most tracks along with the tracks they sample.";
		if (!this.lotsOfSamplesData) {
			$.ajax({
				type: "GET",
				url: "api/neojson?query_type=lots-o-samples"
			}).done( function (jsonResp) {
				that.lotsOfSamplesData = jsonResp;
				that.fillGraph(that.lotsOfSamplesData, title, info);
			});
		} else {
			this.fillGraph(this.lotsOfSamplesData, title, info);
		}
	},
	
	loneNodes: function () {
		var that = this;
		
		var title = "Tracks With No Relationships",
			info = "Showing tracks which are in the BeatTree database, but have no relationships.  Help them out!";
		if (!this.loneNodesData) {
			$.ajax({
				type: "GET",
				url: "api/neojson?query_type=lone-nodes"
			}).done( function (jsonResp) {
				that.loneNodesData = jsonResp;
				that.fillGraph(that.loneNodesData, title, info);
			});
		} else {
			this.fillGraph(this.loneNodesData, title, info);
		}
	},
	
	motherOfDrums: function () {
		var that = this;
		
		var title = "Where the Drums Come From",
			info = "Showing the top 5 tracks which are most sampled for their drums along with the tracks that sampled them.";
		if (!this.motherOfDrumsData) {
			$.ajax({
				type: "GET",
				url: "api/neojson?query_type=mother-o-drums"
			}).done( function (jsonResp) {
				that.motherOfDrumsData = jsonResp;
				that.fillGraph(that.motherOfDrumsData, title, info);
			});
		} else {
			this.fillGraph(this.motherOfDrumsData, title, info);
		}
	},
	
	popularity: function () {
		var that = this;
		
		var title = "Most Popular Tracks",
			info = "Showing the most popular Spotify tracks in the BeatTree database along with their relationships.";
		
			if (!this.popularityData) {
				$.ajax({
					type: "GET",
					url: "api/neojson?query_type=popularity"
				}).done( function (jsonResp) {
					that.popularityData = jsonResp;
					that.fillGraph(that.popularityData, title, info);
				});
			} else {
				this.fillGraph(this.popularityData, title, info);
			}
		
	},
	
	pathSearch: function () {
		alert("This feature is coming soon!");
	},
	
	trackSubgraph: function () {
		alert("This feature is coming soon!");
	},
	
	fillGraph: function (data, title, info) {
		BT.Utils.GVD3(this, data, title, info);
	}
	
});