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
		"click #db-check-btn": "trackCheck",
		"click #add-to-db": "addToDB"
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
			debugger
			var btn = this.$el.find('#db-check-btn');
			btn.replaceWith('<button type="button" id="add-to-db" class="btn btn-success">Add Node</button>');
		}
		var alreadyCreated = function () {
			debugger
			var btn = this.$el.find('#db-check-btn');
			btn.replaceWith('<span>Node Already Exists</span>');
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
		this.model.save({},{
			success: function (model, response, options) {
				debugger
				Backbone.history.navigate('tracks/' + model.id, { trigger: true });
			},
			error: function () {
				alert("Something went wrong with the request");
			}
		});	
	}
});