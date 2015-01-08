json.startNode do
	json.partial!("track", :track => @startNode)
end

json.endNode do
	json.partial!("track", :track => @endNode)
end

json.rel do
	if @rel.type == "SAMPLES"
		json.(@rel, :sample_type, :added_by, :notes, :significance, :child_url, :parent_url, :child_start_time, :parent_start_time, :type)
	else
		json.(@rel, :added_by, :notes, :type)
	end
end
