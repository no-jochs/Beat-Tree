BT.Views.nodeSearch = Backbone.CompositeView.extend({
	initialize: function () {},
	template: JST['backbone/templates/search/track'],
	className: 'search',
	events: {
		'click #spotify-search-go': 'doSpotSearch'
	},
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	doSpotSearch: function (event) {
		event.preventDefault();
		var query = $('#spotify-search-field').val();
		var that = this;
		$.ajax({
			type: "GET",
			url: "https://api.spotify.com/v1/search?q=" + query + "&type=track"
		}).done( function (data) { that.populateResults(data); });
		
		$.ajax({
			type: "GET",
			url: "http://localhost:3000/api/tracksearch?q=" + query,
		});
	},
	populateResults: function (data) {
		this.removeSubviews();
		var that = this;
		_(data.tracks.items).each( function (track) {
			var trackModel = BT.Utils.ParseTrack(track);
			var resultView = new BT.Views.spotSearchResult({ model: trackModel });
			that.addSubview('#spotify-search-results', resultView)
		});
	},
	doBTSearch: function (event) {
		event.preventDefault();
		var query = $('#spotify-search-field').val();
		var that = this;

	}
});

BT.Views.spotSearchResult = Backbone.CompositeView.extend({
	initialize: function () {},
	template: JST['backbone/templates/search/spotResult'],
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
			url: "http://localhost:3000/api/tracks/db_check",
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