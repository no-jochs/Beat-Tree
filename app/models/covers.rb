class Covers
  include Neo4j::ActiveRel
  
  from_class Track
  to_class Track
  type 'COVERS'
  
  property :notes
  property :contest_count
  property :created_at
  property :updated_at
  property :added_by
end