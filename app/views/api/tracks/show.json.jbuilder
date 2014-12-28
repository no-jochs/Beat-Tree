json.partial!("track", :track => @track)

json.sampled_tracks @track.samples do |track|
	json.partial!("track", :track => track)
end

json.sampled_by @track.sampled_by do |track|
	json.partial!("track", :track => track)
end

json.remixed_tracks @track.remixes do |track|
	json.partial!("track", :track => track)
end

json.remixed_by @track.remixed_by do |track|
	json.partial!("track", :track => track)
end

json.covered_tracks @track.covers do |track|
	json.partial!("track", :track => track)
end

json.covered_by @track.covered_by do |track|
	json.partial!("track", :track => track)
end