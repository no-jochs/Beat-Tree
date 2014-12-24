BT.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},
	routes: {
		"search": "trackSearch",
		"spotifyTrack": "trackShow" 
	},
	trackSearch: function () {
		var view = new BT.Views.nodeSearch();
		this._swapView(view);
	},
	spotifyTrack: function () {
		var view = new BT.Views.TrackShow
	},
	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},
})