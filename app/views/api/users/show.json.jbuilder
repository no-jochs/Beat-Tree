json.partial!("user", :user => @user)

json.relationships @relationships

json.relationship_count @relcount.first["COUNT(r)"]

json.track_count @trackcount.first["COUNT(a)"]