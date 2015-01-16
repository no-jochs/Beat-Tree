class Remixes
  include Neo4j::ActiveRel
  
  from_class Track
  to_class Track
  type 'REMIXES'
  
  property :notes
  property :contest_count
  property :created_at
  property :upated_at
  property :added_by
end