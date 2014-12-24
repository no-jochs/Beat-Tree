var BTSearch = function () {
	
	var searchString = $('#spotify-search');
	var qparams = "?q=" + searchString.val() + "&type=track";

	$.ajax({
		type: "GET",
		url: "https://api.spotify.com/v1/search" + qparams
	})
	.done( function (data) {
		console.log(data);
	});
}