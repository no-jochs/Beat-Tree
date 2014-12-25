BT.Utils.ParseTrack = function (spotJSON) {
	var track = new BT.Models.Track;
	track.set({
		track_spotify_id: spotJSON.id,
		track_name: spotJSON.name,
		track_number: spotJSON.track_number,
		track_preview_url: spotJSON.preview_url,
		track_spotify_uri: spotJSON.uri,
		track_popularity: spotJSON.popularity,
		track_href: spotJSON.href,
		track_external_url: spotJSON.external_urls.spotify,
		track_duration_ms: spotJSON.duration_ms,
		artist_name: spotJSON.artists[0].name,
		artist_spotify_id: spotJSON.artists[0].id,
		artist_spotify_href: spotJSON.artists[0].href,
		artist_href: spotJSON.artists[0].href,
		album_name: spotJSON.album.name,
		album_spotify_id: spotJSON.album.id,
		album_spotify_uri: spotJSON.album.uri,
		album_l_image: spotJSON.album.images[0].url,
		album_m_image: spotJSON.album.images[1].url,
		album_s_image: spotJSON.album.images[2].url,
		album_href: spotJSON.album.href
	});
	return track;
}