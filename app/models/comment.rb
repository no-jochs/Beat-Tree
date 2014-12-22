class Comment
  include Neo4j::ActiveNode
  property :title
  property :text
  
  index :title
  has_one(:track).from(Track, :comments)
end
