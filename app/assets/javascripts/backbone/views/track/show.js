BT.Views.TrackShow = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},
	
	template: JST['backbone/templates/track/show'],
	
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent)
		this.addParentView();
		this.addChildView();
		return this;
	},
	
	addParentView: function () {
		var parentsView = new BT.Views.TrackShowParentView({
			model: this.model
		});
		this.addSubview('#parents-view-container', parentsView);
	},
	
	addChildView: function () {
		var childrenView = new BT.Views.TrackShowChildView({
			model: this.model
		});
		this.addSubview('#children-view-container', childrenView);
	}
});

BT.Views.TrackShowChildView = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click li.filter-options": "filterNodeView"
	},
	
	template: JST['backbone/templates/track/children'],
	
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent);
		this.addNodes(this.model.sampling_tracks);
		this.attachSubviews();
		return this;
	},
	
	addNodes: function (collection) {
		this.removeSubviews();
		this.$el.find('#child-node-container').empty();
		var that = this;
		if (collection.length > 0) {
			collection.each( function (track) {
				var nodeView = new BT.Views.TrackShowNodeView({
					model: track
				});
				that.addSubview('#child-node-container', nodeView);
			});
		} else {
			$('#child-node-container').html(
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
		this.$el.find('li.filter-options').removeClass('active')
		$(event.currentTarget).addClass('active');
		switch (option) {
			case 1:
				this.addNodes(this.model.sampling_tracks);
				break;
			case 2:
				this.addNodes(this.model.covering_tracks);
				break;
			case 3:
				this.addNodes(this.model.remixing_tracks);
				break;
			}
	}

});


BT.Views.TrackShowParentView = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.sampled_tracks, "sync", this.render);
	},
	
	events: {
		"click li.filter-options": "filterNodeView",
		"click button.add-parent-node-btn": "addSearchView"
	},
	
	template: JST['backbone/templates/track/parents'],
	
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent);
		this.addNodes(this.model.sampled_tracks);
		this.attachSubviews();
		return this;
	},
	
	addNodes: function (collection) {
		this.removeSubviews();
		this.$el.find('#parent-node-container').empty();
		var that = this;
		if (collection.length > 0) {
			collection.each( function (track) {
				var nodeView = new BT.Views.TrackShowNodeView({
					model: track
				});
				that.addSubview('#parent-node-container', nodeView);
			});
		} else {
			$('#parent-node-container').html(
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
		this.$el.find('li.filter-options').removeClass('active')
		$(event.currentTarget).addClass('active');
		switch (option) {
			case 1:
				this.addNodes(this.model.sampled_tracks);
				break;
			case 2:
				this.addNodes(this.model.covered_tracks);
				break;
			case 3:
				this.addNodes(this.model.remixed_tracks);
				break;
			}
	},
	
	addSearchView: function (event) {
		$('#parent-node-search-container').empty();
		$('#parent-node-confirm-container').empty();
		$('#parent-node-relationship-container').empty();
		var searchView = new BT.Views.trackShowSpotSearch({ parentModel: this });
		this.addSubview('#parent-node-search-container', searchView);
	},
	
	addConfirmationView: function (model) {
		var searchView = this.subviews('#parent-node-search-container')[0];
		this.removeSubview('#parent-node-search-container', searchView);
		var confirmView = new BT.Views.nodeConfirmView({
			childModel: this.model,
			parentModel: model
		});
		this.addSubview('#parent-node-confirm-container', confirmView);
	},
	
});

BT.Views.TrackShowNodeView = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},
	
	template: JST['backbone/templates/track/nodeView'],
	
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent);
		return this;
	}
});

BT.Views.trackShowSpotSearch = BT.Views.nodeSearch.extend({
	initialize: function (options) {
		this.parentModel = options.parentModel;
	},
	populateResults: function (data) {
		this.removeSubviews();
		var that = this;
		_(data.tracks.items).each( function (track) {
			var trackModel = BT.Utils.ParseTrack(track);
			var resultView = new BT.Views.trackShowSpotSearchResult({
				model: trackModel,
				parentModel: that.parentModel
			});
			that.addSubview('#spotify-search-results', resultView);
		});
	}
});

BT.Views.trackShowSpotSearchResult = BT.Views.spotSearchResult.extend({
	initialize: function (options) {
		this.parentModel = options.parentModel;
		this.model = options.model;
		this.previousView = options.previousView;
	},
	useExistingTrack: function () {
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
				proceed = true;
				break;
			case "covers":
				this.childModel.set({new_covers: this.parentModel.id});
				proceed = true;
				break;
			case "remixes":
				this.childModel.set({new_remixes: this.parentModel.id});
				proceed = true;
				break;
			default:
				console.log("Tampering with server requests in not a nice thing to do.");
		}
		if (proceed) {
			this.childModel.save({},{
				success: function (model, response, options) {
					this.childModel = model;
					$('#create-relationship-button').html('Created!');
					$('#cancel-relationship-create').html('Dismiss');
				}
			});
		}
	},
	
	cancelRelationship: function (event) {}
})