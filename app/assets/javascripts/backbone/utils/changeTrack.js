BT.Utils.changePlayerTrack = function (spot_track_id) {
	var playerWindow = $('#beat-tree-player-viewport');
	playerWindow.empty();
	playerWindow.html(
		'<iframe src="https://embed.spotify.com/?uri=spotify:track:' + spot_track_id + '"' + ' width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'
	);
	
	var trackQueue = $('.track-queue-container');
	trackQueue.append(
		'<div class="track-queue-item-container" data-track-id="' + spot_track_id + '">' + 
		'<iframe src="https://embed.spotify.com/?uri=spotify:track:' + spot_track_id + '"' + ' width="250" height="80" frameborder="0" allowtransparency="true"></iframe>' +
		'<button type="button" class="btn btn-danger" onclick="BT.Utils.cleanUpButton(' + '\'' + spot_track_id + '\'' + ')"><span class="glyphicon glyphicon-remove-sign"></span></button>' + 
		'</div>'
	);
	
	$('button')
	
}

BT.Utils.cleanUpButton = function (id) {
	debugger
}