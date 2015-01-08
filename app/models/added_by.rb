class AddedBy
  include Neo4j::ActiveRel
  
  from_class User
  to_class Track
  
  type 'ADDED'
end