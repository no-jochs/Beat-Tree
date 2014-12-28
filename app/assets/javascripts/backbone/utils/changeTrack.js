BT.Utils.changePlayerTrack = function (spot_track_id) {
	var playerWindow = $('#beat-tree-player-viewport');
	playerWindow.empty();
	playerWindow.html(
		'<iframe src="https://embed.spotify.com/?uri=spotify:track:' + spot_track_id + '"' + ' width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'
	);
	
	//Only add track to the track queue if the track queue is open
	
	if ($('#collapse-track-queue').hasClass('collapse in')) {
		var trackQueue = $('.track-queue-container');
		trackQueue.append(
			'<div class="track-queue-item-container" data-track-id="' + spot_track_id + '">' + 
			'<iframe src="https://embed.spotify.com/?uri=spotify:track:' + spot_track_id + '"' + ' width="250" height="80" frameborder="0" allowtransparency="true"></iframe>' +
			'<button type="button" class="btn-danger track-queue-delete" onclick="BT.Utils.cleanUpButton(' + '\'' + spot_track_id + '\'' + ')"><span class="glyphicon glyphicon-remove-sign"></span></button>' + 
			'</div>'
		);
	}
	
}

BT.Utils.cleanUpButton = function (id) {
	tracksInQueue = $.find('.track-queue-item-container');
	
	_(tracksInQueue).each( function (trackContainer) {
		if ($(trackContainer).data('track-id') === id) {
			$(trackContainer).remove();
		}
	});
}

