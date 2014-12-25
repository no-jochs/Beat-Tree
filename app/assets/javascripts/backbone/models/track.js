BT.Models.Track = Backbone.Model.extend({
	urlRoot: "api/tracks",
	parse: function (respJSON) {
		if (respJSON.track) {
			return respJSON.track;
		} else {
			return respJSON;
		}
	}
})