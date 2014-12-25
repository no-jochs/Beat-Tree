BT.Views.nodeSearch = Backbone.CompositeView.extend({
	initialize: function () {
		
	},
	template: JST['backbone/templates/search/track'],
	className: 'search',
	events: {
		'click #spotify-search-go': 'doSearch'
	},
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	doSearch: function (event) {
		event.preventDefault();
		var query = $('#spotify-search-field').val();
		var that = this;
		$.ajax({
			type: "GET",
			url: "https://api.spotify.com/v1/search?q=" + query + "&type=track"
		}).done( function (data) { that.populateResults(data); });
	},
	populateResults: function (data) {
		this.removeSubviews();
		var that = this;
		_(data.tracks.items).each( function (track) {
			var trackModel = BT.Utils.ParseTrack(track);
			debugger
			var resultView = new BT.Views.spotSearchResult({ model: trackModel });
			that.addSubview('#spotify-search-results', resultView)
		});
	}
});

BT.Views.spotSearchResult = Backbone.CompositeView.extend({
	initialize: function () {},
	template: JST['backbone/templates/search/spotResult'],
	tagName: 'tr',
	events: {
		"mouseenter": "highlightItem",
		"mouseleave": "deHighlightItem",
		"click #db-check-btn": "trackCheck"
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
		debugger
		$.ajax({
			type: "GET",
			url: "http://localhost:3000/api/tracks/db_check",
			data: { track_spotify_id: id },
			statusCode: { 
				404: function () { alert("Not Found in BTDB") },
				200: function () { alert("This Track is already in the Beat Tree.")}
			}
		});
	}
});