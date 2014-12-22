class Comment
  include Neo4j::ActiveNode
  property :title
  property :text
  
  index :title
  has_one :out, :track, type: :track, model_class: Track
end
