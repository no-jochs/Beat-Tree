class Track
  include Neo4j::ActiveNode
  property :title
  property :text, default: "blah blah"
  property :score, type: Integer, default: 0
  
  validates :title, presence: true
  validates :score, numericality: { only_integer: true }
  
  index :title
  
  before_save do
    self.score = score * 100
  end
  
  has_n(:comments).to(Comment)
end
