class Remixes
  include Neo4j::ActiveRel
  
  from_class Track
  to_class Track
  type 'REMIXES'
  
  property :notes
  property :added_by
end