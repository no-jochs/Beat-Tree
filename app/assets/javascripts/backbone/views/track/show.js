BT.Views.TrackShow = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},
	
	events: {
		"click button.add-track-to-player": "swapTrack",
		"click .pred-and-prog-btn": "graphPredProg",
		"click .origins-btn": "graphOrigins",
		"click .inspirations-btn": "graphInspirations",
		"click .subgraph-btn": "graphSubgraph"
	},
	
	template: JST['backbone/templates/track/trackShow'],
	
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent)
		this.addPredecessorsView();
		this.addProgenyView();
		return this;
	},
	
	addPredecessorsView: function () {
		var predecessorView = new BT.Views.ConnectionsPredecessorsView({
			model: this.model
		});
		this.addSubview('#connections-predecessors-container', predecessorView);
	},
	
	addProgenyView: function () {
		var progenyView = new BT.Views.ConnectionsProgenyView({
			model: this.model
		});
		this.addSubview('#connections-progeny-container', progenyView);
	},
	
	swapTrack: function (event) {
		BT.Utils.changePlayerTrack(this.model.get('track_spotify_id'));
	},
	
	graphPredProg: function (event) {
		var that = this;
		$.ajax({
			type: "GET",
			url: "http://www.beat-tree.com/api/neojson?query_type=predandprog&node_id=" + that.model.get('track_spotify_id')
		}).done( function (jsonResp) {
			that.addPredProgData(jsonResp);
		});
	},
	
	graphOrigins: function (event) {
		var that = this;
		$.ajax({
			type: "GET",
			url: "http://www.beat-tree.com/api/neojson?query_type=origins&node_id=" + that.model.get('track_spotify_id')
		}).done( function (jsonResp) {
			that.addOriginsData(jsonResp);
		});
	},
	
	graphInspirations: function (event) {
		var that = this;
		$.ajax({
			type: "GET",
			url: "http://www.beat-tree.com/api/neojson?query_type=inspirations&node_id=" + that.model.get('track_spotify_id')
		}).done( function (jsonResp) {
			that.addInspirationsData(jsonResp);
		});
	},
	
	graphSubgraph: function (event) {
		var that = this;
		$.ajax({
			type: "GET",
			url: "http://www.beat-tree.com/api/neojson?query_type=subgraph&node_id=" + that.model.get('track_spotify_id')
		}).done( function (jsonResp) {
			that.addSubgraphData(jsonResp);
		});
	},
	
	addPredProgData: function (data) {
		var title = "Immediate Predecessors & Progeny",
			info = "Showing tracks derived from the current track, tracks the current track is derived from, and the current track itself.";
		
		BT.Utils.TrackShowD3(this, data, title, info);
	},
	
	addOriginsData: function (data) {
		var title = "Track Origins",
			info = "Showing tracks the current track is derived from, and recursively showing the tracks they are derived from in turn.";
	
		BT.Utils.TrackShowD3(this, data, title, info);
	},
	
	addInspirationsData: function (data) {
		var title = "Track Inspirations",
		info = "Showing tracks that are inspired by the current track, and then recursively showing derivations of those tracks to the eventual terminus.";
		
		BT.Utils.TrackShowD3(this, data, title, info);
	},
	
	addSubgraphData: function (data) {
		var title = "Full Subgraph",
		info = "Showing the current track in relation to its position in its isolated subgraph.";
		
		BT.Utils.TrackShowD3(this, data, title, info);
	}
});

BT.Views.ConnectionsProgenyView = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, "sync change", this.render);
		this.listenTo(this.model.sampling_tracks, "add remove", this.render);
	},
	
	events: {
		"click li.filter-options": "filterNodeView",
		"click li.add-progeny-node": "addSearchView"
	},
	
	template: JST['backbone/templates/track/connectionsViewProgeny'],
	
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent);
		this.addNodes(this.model.sampling_tracks, 'sampling');
		this.attachSubviews();
		return this;
	},
	
	addNodes: function (collection, relType) {
		this.removeSubviews();
		this.$el.find('#nodes-container').empty();
		var that = this;
		if (collection.length > 0) {
			collection.each( function (track) {
				track.set({ relationship: 'progeny', relationshipType: relType, parentNodeId: that.model.get('id') });
				var nodeView = new BT.Views.TrackShowNodeView({
					model: track
				});
				that.addSubview('#nodes-container', nodeView);
			});
		} else {
			this.$el.find('#nodes-container').html(
				'<div class="no-node-placeholder">' +
					'<h3 class="text-center no-node-placeholder-text">' +
						'No Nodes To Show' +
					'</h3>' +
				'</div>');
		}

	},
	
	filterNodeView: function (event) {
		event.preventDefault();
		var option = $(event.currentTarget).data('option');
		this.$el.find('li.filter-options.active').removeClass('active')
		$(event.currentTarget).addClass('active');
		switch (option) {
			case 1:
				this.addNodes(this.model.sampling_tracks, 'sampling');
				break;
			case 2:
				this.addNodes(this.model.covering_tracks, 'covering');
				break;
			case 3:
				this.addNodes(this.model.remixing_tracks, 'remixing');
				break;
			}
	},
	
	addSearchView: function (event) {
		event.preventDefault();
		$('#progeny-node-search-container').empty();
		$('#progeny-node-confirm-container').empty();
		$('#progeny-node-relationship-container').empty();
		var searchView = new BT.Views.trackShowSpotSearch({ parentModel: this });
		this.addSubview('#progeny-node-search-container', searchView);
	},
	
	addConfirmationView: function (model) {
		var searchView = this.subviews('#progeny-node-search-container')[0];
		this.removeSubview('#progeny-node-search-container', searchView);
		var confirmView = new BT.Views.nodeConfirmView({
			childModel: model,
			parentModel: this.model
		});
		this.addSubview('#progeny-node-confirm-container', confirmView);
	},

});


BT.Views.ConnectionsPredecessorsView = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, "sync change", this.render);
		this.listenTo(this.model.sampled_tracks, "add remove", this.render);
	},
	
	events: {
		"click li.filter-options": "filterNodeView",
		"click li.add-predecessor-node": "addSearchView"
	},
	
	template: JST['backbone/templates/track/connectionsViewPredecessors'],
	
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent);
		this.addNodes(this.model.sampled_tracks, 'samples');
		this.attachSubviews();
		return this;
	},
	
	addNodes: function (collection, relType) {
		this.removeSubviews();
		this.$el.find('#nodes-container').empty();
		var that = this;
		if (collection.length > 0) {
			collection.each( function (track) {
				track.set({ relationship: 'predecessor', relationshipType: relType, parentNodeId: that.model.get('id') });
				var nodeView = new BT.Views.TrackShowNodeView({
					model: track
				});
				that.addSubview('#nodes-container', nodeView);
			});
		} else {
			this.$el.find('#nodes-container').html(
				'<div class="no-node-placeholder">' +
					'<h3 class="text-center no-node-placeholder-text">' +
						'No Nodes To Show' +
					'</h3>' +
				'</div>');
		}
	},
	
	filterNodeView: function (event) {
		event.preventDefault();
		var option = $(event.currentTarget).data('option');
		this.$el.find('li.filter-options.active').removeClass('active')
		$(event.currentTarget).addClass('active');
		switch (option) {
			case 1:
				this.addNodes(this.model.sampled_tracks, 'samples');
				break;
			case 2:
				this.addNodes(this.model.covered_tracks, 'covers');
				break;
			case 3:
				this.addNodes(this.model.remixed_tracks, 'remixes');
				break;
			}
	},
	
	addSearchView: function (event) {
		event.preventDefault();
		$('#predecessor-node-search-container').empty();
		$('#predecessor-node-confirm-container').empty();
		$('#predecessor-node-relationship-container').empty();
		var searchView = new BT.Views.trackShowSpotSearch({ parentModel: this });
		this.addSubview('#predecessor-node-search-container', searchView);
	},
	
	addConfirmationView: function (model) {
		var searchView = this.subviews('#predecessor-node-search-container')[0];
		this.removeSubview('#predecessor-node-search-container', searchView);
		var confirmView = new BT.Views.nodeConfirmView({
			childModel: this.model,
			parentModel: model
		});
		this.addSubview('#predecessor-node-confirm-container', confirmView);
	}
	
});

BT.Views.TrackShowNodeView = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},
	
	events: {
		"click button.add-node-to-player": "swapTrack",
		"click button.relationship-link": "goToRelationship"
	},
	
	template: JST['backbone/templates/track/largeNodeView'],
	
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	
	goToRelationship: function(event) {
		if (this.model.get('relationshipType') === 'sampling') {
			Backbone.history.navigate(
				"#relationship/SAMPLES/" + 
				this.model.get('track_spotify_id') + '/' + this.model.get('parentNodeId'),
				{ trigger: true }
			);
		} else if (this.model.get('relationshipType') === 'covering') {
			Backbone.history.navigate(
				"#relationship/COVERS/" + 
				this.model.get('track_spotify_id') + '/' + this.model.get('parentNodeId'),
				{ trigger: true }
			);
		} else if (this.model.get('relationshipType') === 'remixing') {
			Backbone.history.navigate(
				"#relationship/REMIXES/" + 
				this.model.get('track_spotify_id') + '/' + this.model.get('parentNodeId'),
				{ trigger: true }
			);
		} else if (this.model.get('relationshipType') === 'samples') {
			Backbone.history.navigate(
				"#relationship/SAMPLES/" + 
				this.model.get('parentNodeId') + '/' + this.model.get('id'),
				{ trigger: true }
			);
		} else if (this.model.get('relationshipType') === 'covers') {
			Backbone.history.navigate(
				"#relationship/COVERS/" + 
				this.model.get('parentNodeId') + '/' + this.model.get('id'),
				{ trigger: true }
			);
		} else if (this.model.get('relationshipType') === 'remixes') {
			Backbone.history.navigate(
				"#relationship/REMIXES/" + 
				this.model.get('parentNodeId') + '/' + this.model.get('id'),
				{ trigger: true }
			);
		}
		
	},
	
	swapTrack: function (event) {
		BT.Utils.changePlayerTrack(this.model.get('track_spotify_id'));
	}
});

//The following views are for the add node modal

BT.Views.trackShowSpotSearch = BT.Views.nodeSearch.extend({
	initialize: function (options) {
		this.parentModel = options.parentModel;
	},
	
	populateSpotResults: function (data) {
		var that = this;
		_(data.tracks.items).each( function (track) {
			var trackModel = BT.Utils.ParseTrack(track);
			var resultView = new BT.Views.TrackShowSpotSearchResult({ 
				model: trackModel,
				parentModel: that.parentModel
			});
			that.addSubview('#spot-search-results', resultView);
		});
	},

	populateBTResults: function (data) {
		var that = this;
		_(data).each( function(track) {
			var trackModel = new BT.Models.Track(track.track);
			var resultView = new BT.Views.TrackShowSpotSearchResult({
				model: trackModel,
				parentModel: that.parentModel
			});
			that.addSubview("#bt-search-results", resultView);
		});
	}

});

BT.Views.TrackShowSpotSearchResult = BT.Views.SearchResult.extend({
	initialize: function (options) {
		this.parentModel = options.parentModel;
		this.model = options.model;
		this.previousView = options.previousView;
	},
	useExistingTrack: function (event) {
		this.parentModel.addConfirmationView(this.model);
	}
});

BT.Views.nodeConfirmView = Backbone.CompositeView.extend({
	initialize: function (options) {
		this.childModel = options.childModel;
		this.parentModel = options.parentModel;
	},
	
	events: {
		"click #create-relationship-btn": "createRelationship",
		"click #cancel-relationship-create": "cancelRelationship"
	},
	
	className: 'row',
	
	template: JST['backbone/templates/track/nodeComparison'],
	
	render: function () {
		var renderedContent = this.template({
			childModel: this.childModel,
			parentModel: this.parentModel
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	createRelationship: function (event) {
		var option = $('#relation-dropdown').find(":selected").val();
		var proceed = false;
		switch(option){
			case "samples":
				this.childModel.set({new_samples: this.parentModel.id});
				this.relationship = 'SAMPLES';
				proceed = true;
				break;
			case "covers":
				this.childModel.set({new_covers: this.parentModel.id});
				proceed = true;
				this.relationship = 'COVERS';
				break;
			case "remixes":
				this.childModel.set({new_remixes: this.parentModel.id});
				this.relationship = "REMIXES"
				proceed = true;
				break;
			default:
				console.log("Tampering with server requests in not a nice thing to do.");
		}
		if (proceed) {
			var that = this;
			this.childModel.save({},{
				success: function (model, response, options) {
					Backbone.history.navigate("#relationship/edit/" + that.relationship + '/' + that.childModel.get('track_spotify_id') + '/' + that.parentModel.get('track_spotify_id'), {trigger: true});
				}
			});
		}
	},
	
	cancelRelationship: function (event) {
		BT.Utils.FreePage();
	}
})