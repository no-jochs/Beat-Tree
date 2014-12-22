class Artist
  include Neo4j::ActiveNode
  property :name
  property :spotify_uri
  
  index :spotify_uri
end
