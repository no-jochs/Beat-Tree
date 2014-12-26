BT.Models.Track = Backbone.Model.extend({
	initialize: function () {
		this.sampled_tracks = new BT.Collections.Tracks;
		this.sampling_tracks = new BT.Collections.Tracks;
		this.covered_tracks = new BT.Collections.Tracks;
		this.covering_tracks = new BT.Collections.Tracks;
		this.remixed_tracks = new BT.Collections.Tracks;
		this.remixing_tracks = new BT.Collections.Tracks;
	},
	
	urlRoot: "api/tracks",
	
	parse: function (respJSON) {
		if (respJSON.sampled_tracks) {
			var st = [];
			_(respJSON.sampled_tracks).each( function (track) {
				var model = new BT.Models.Track(track);
				st.push(model);
			});
			this.sampled_tracks.set(st);
			delete respJSON.sampled_tracks;
		}
		if (respJSON.sampled_by) {
			var st = [];
			_(respJSON.sampled_by).each( function (track) {
				var model = new BT.Models.Track(track);
				st.push(model);
			});
			this.sampling_tracks.set(st);
			delete respJSON.sampled_by;
		}
		if (respJSON.track) {
			delete respJSON.track;
		}
		return respJSON;
	},
})