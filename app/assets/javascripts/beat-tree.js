window.BT = {
	Models: {},
	Collections: {},
	Views: {},
	Router: {},
	Utils: {},
	initialize: function () {
		new BT.Router({ $rootEl: $('#beat-tree-content')});
		Backbone.history.start();
	}
};

$(document).ready( function () {
	BT.initialize();
});

