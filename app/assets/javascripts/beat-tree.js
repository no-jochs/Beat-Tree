window.BT = {
	Models: {},
	Collections: {},
	Views: {},
	Router: {},
	Utils: {},
	initialize: function () {
		console.log("here");
		new BT.Router({ $rootEl: $('#beat-tree-content')});
		Backbone.history.start();
	}
};

$(document).ready( function () {
	BT.initialize();
});
