BT.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},
	routes: {
		"": "splash",
		"search": "trackSearch",
		"tracks/:id": "trackShow",
		"users/new": "newUser",
		"welcome": "welcomePage",
		"signin": "signIn",
		"feed": "feed",
		"stats": "stats",
		"graphview": "graphView",
		"relationship/:query": "showRelationship",
		"learnmore": "learnMore",
		"johnochs": "johnOchs"
	},
	splash: function () {
		var view = new BT.Views.Splash();
		this._swapView(view);
	},
	trackSearch: function () {
		var view = new BT.Views.nodeSearch();
		this._swapView(view);
	},
	trackShow: function (id) {
		var track = BT.Collections.tracks.getOrFetch(id);
		var view = new BT.Views.TrackShow({ model: track });
		this._swapView(view);
	},
	newUser: function () {
		var view = new BT.Views.NewUser();
		this._swapView(view);
	},
	welcomePage: function () {
		var view = new BT.Views.Welcome();
		this._swapView(view)
	},
	signIn: function () {
		var view = new BT.Views.SignIn();
		this._swapView(view);
	},
	feed: function () {
		var view = new BT.Views.Feed();
		this._swapView(view);
	},
	graphView: function () {
		var view = new BT.Views.GraphView();
		this._swapView(view);
	},
	showRelationship: function (query) {
		var that = this;
		$.ajax({
			type: "GET",
			url: "http://www.beat-tree.com/api/relationships?" + query,
		}).done( function(data) {
			var model = new BT.Models.Relationship(data, { parse: true });
			var view = new BT.Views.Relationship({ model: model });
			that._swapView(view)
		});
	},
	learnMore: function () {
		var view = new BT.Views.LearnMore();
		this._swapView(view);
	},
	johnOchs: function () {
		var view = new BT.Views.JohnOchs();
		this._swapView(view);
	},
	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},
});