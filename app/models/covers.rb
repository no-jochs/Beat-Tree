class Covers
  include Neo4j::ActiveRel
  
  from_class Track
  to_class Track
  type 'COVERS'
  
  property :notes
  property :added_by
end