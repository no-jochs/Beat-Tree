BT.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},
	routes: {
		"search": "trackSearch"
	},
	trackSearch: function () {
		var view = new BT.Views.nodeSearch();
		this._swapView(view);
	},
	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},
})