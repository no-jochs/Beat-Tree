BT.Collections.Tracks = Backbone.Collection.extend({
	initialize: function (options) {},
	
	model: BT.Models.Track,
	
	getOrFetch: function (id) {
		var tracks = this;
		var track;
		if (track = this.get('id')) {
			track.fetch();
		} else {
			track = new BT.Models.Track({ id: id });
			track.fetch({
				success: function () { tracks.add(track); }
			});
		}
	}
});

BT.Collections.tracks = new BT.Collections.Tracks;