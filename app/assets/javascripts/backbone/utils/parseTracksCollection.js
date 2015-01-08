BT.Utils.ParseTracksCollection = function (respJSON) {
	var tracksObjs = [];
	
	_.each(respJSON, function (trackObj) {
		tracksObjs.push(new BT.Models.Track(trackObj.t.track));
	});
	
	return tracksObjs;
}