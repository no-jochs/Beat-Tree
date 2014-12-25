json.partial!("track", :track => @track)

json.sampled_tracks @track.samples do |track|
	json.partial!("track", :track => track)
end

json.sampled_by @track.sampled_by do |track|
	json.partial!("track", :track => track)
end