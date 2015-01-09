BT.Views.nodeSearch = Backbone.CompositeView.extend({
	initialize: function () {},
	template: JST['backbone/templates/search/track'],
	className: 'search',
	events: {
		'click #search-go': 'doSearch'
	},
	render: function () {
		this.attachSubviews();
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	doSearch: function (event) {
		event.preventDefault();
		this.removeSubviews();
		var query = $('#track-search-field').val();
		var that = this;
		$.ajax({
			type: "GET",
			url: "https://api.spotify.com/v1/search?q=" + query + "&type=track"
		}).done( function (data) { that.populateSpotResults(data); });
		
		$.ajax({
			type: "GET",
			url: "http://www.beat-tree.com/api/tracksearch?q=" + query,
		}).done( function (data) { that.populateBTResults(data); });
		
	},
	populateSpotResults: function (data) {
		var that = this;
		_(data.tracks.items).each( function (track) {
			var trackModel = BT.Utils.ParseTrack(track);
			var resultView = new BT.Views.SearchResult({ model: trackModel });
			that.addSubview('#spot-search-results', resultView);
		});
	},

	populateBTResults: function (data) {
		var that = this;
		_(data).each( function(track) {
			var trackModel = new BT.Models.Track(track.track);
			var resultView = new BT.Views.SearchResult({ model: trackModel });
			that.addSubview("#bt-search-results", resultView);
		});
	}
});

BT.Views.SearchResult = Backbone.CompositeView.extend({
	initialize: function () {},
	template: JST['backbone/templates/search/searchResult'],
	tagName: 'tr',
	events: {
		"mouseenter": "highlightItem",
		"mouseleave": "deHighlightItem",
		"click #db-check-btn": "trackCheck",
		"click #add-to-db": "addToDB",
		"click #use-existing-track": "useExistingTrack",
		"click #spot-preview-play": "swapTrack"
	},
	render: function () {
		this.attachSubviews();
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	highlightItem: function (event) {
		event.currentTarget.style.background = "black";
		event.currentTarget.style.color = "white";
	},
	deHighlightItem: function (event) {
		event.currentTarget.style.background = "";
		event.currentTarget.style.color = "";
	},
	trackCheck: function () {
		var id = this.model.get('track_spotify_id');
		var createAddButton = function () {
			var btn = this.$el.find('#db-check-btn');
			btn.replaceWith('<button type="button" id="add-to-db" class="btn btn-warning">Add Node</button>');
		}
		var alreadyCreated = function () {
			this.model.set({ id: this.model.get('track_spotify_id')});
			var btn = this.$el.find('#db-check-btn');
			btn.replaceWith('<button type="button" id="use-existing-track" class="btn btn-success">Go</button>');
		}
		var that = this;
		$.ajax({
			type: "GET",
			url: "http://www.beat-tree.com/api/tracks/db_check",
			data: { track_spotify_id: id },
			statusCode: { 
				404: createAddButton.bind(that),
				200: alreadyCreated.bind(that)
			}
		});
	},
	addToDB: function () {
		var that = this;
		this.model.save({},{
			success: function (model, response, options) {
				var btn = that.$el.find('#add-to-db');
				that.model.set('id', that.model.get('track_spotify_id'));
				btn.replaceWith('<button type="button" id="use-existing-track" class="btn btn-success">Go</button>');
			},
			error: function (model, response, options) {
				alert("Something went wrong with the request.  Please refresh the page and try your search again.");
			}
		});	
	},
	useExistingTrack: function () {
		Backbone.history.navigate("tracks/" + this.model.get('track_spotify_id'), { trigger: true });
	},
	
	swapTrack: function (event) {
		event.preventDefault();
		BT.Utils.changePlayerTrack(this.model.get('track_spotify_id'));
	}
	
});