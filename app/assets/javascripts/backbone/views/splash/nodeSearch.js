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
		var $tableEl = $('#spotify-search-results')
		$tableEl.empty();
		var tracks = [];
		_(data.tracks.items).each( function (track) {
			var trackModel = new BT.Models.Track();
			trackModel.set(track);
			tracks.push(trackModel);
			var resultView = new BT.Views.spotSearchResult({ model: trackModel });
			$tableEl.append(resultView.render().$el);
		});
	}
});

BT.Views.spotSearchResult = Backbone.View.extend({
	initialize: function () {
		
	},
	template: JST['backbone/templates/search/spotResult'],
	tagName: 'tr',
	events: {},
	render: function () {
		var renderedContent = this.template({ track: this.model });
		this.$el.html(renderedContent);
		return this;
	}
});