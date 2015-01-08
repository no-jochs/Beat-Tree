BT.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},
	routes: {
		"search": "trackSearch",
		"tracks/:id": "trackShow",
		"users/new": "newUser",
		"welcome": "welcomePage",
		"signin": "signIn",
		"feed": "feed",
		"stats": "stats",
		"graphview": "graphView"
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
	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},
})