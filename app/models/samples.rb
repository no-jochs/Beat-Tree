class Samples
  include Neo4j::ActiveRel
  
  from_class Track
  to_class Track
  type 'SAMPLES'
  
  property :sample_type
  property :added_by
  property :notes
  property :significance, type: Integer
  property :child_url
  property :parent_url
  property :child_start_time
  property :parent_start_time
end