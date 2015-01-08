BT.Models.Track = Backbone.Model.extend({
	initialize: function () {
		this.sampled_tracks = new BT.Collections.Tracks;
		this.sampling_tracks = new BT.Collections.Tracks;
		this.covered_tracks = new BT.Collections.Tracks;
		this.covering_tracks = new BT.Collections.Tracks;
		this.remixed_tracks = new BT.Collections.Tracks;
		this.remixing_tracks =  new BT.Collections.Tracks;
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
		if (respJSON.remixed_tracks) {
			var st = [];
			_(respJSON.remixed_tracks).each( function (track) {
				var model = new BT.Models.Track(track);
				st.push(model);
			});
			this.remixed_tracks.set(st);
			delete respJSON.remixed_tracks;
		}
		if (respJSON.remixed_by) {
			var st = [];
			_(respJSON.remixed_by).each( function (track) {
				var model = new BT.Models.Track(track);
				st.push(model);
			});
			this.remixing_tracks.set(st);
			delete respJSON.remixed_by;
		}
		if (respJSON.covered_tracks) {
			var st = [];
			_(respJSON.covered_tracks).each( function (track) {
				var model = new BT.Models.Track(track);
				st.push(model);
			});
			this.covered_tracks.set(st);
			delete respJSON.covered_tracks;
		}
		if (respJSON.covered_by) {
			var st = [];
			_(respJSON.covered_by).each( function (track) {
				var model = new BT.Models.Track(track);
				st.push(model);
			});
			this.covering_tracks.set(st);
			delete respJSON.covered_by;
		}
		if (respJSON.track) {
			delete respJSON.track;
		}
		return respJSON;
	}
});