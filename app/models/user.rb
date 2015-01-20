class User
  include Neo4j::ActiveNode
  
  before_validation :ensure_token
  before_save :ensure_password_confirmation
  
  property :username, index: :exact, constraint: :unique
  property :password
  property :password_confirmation
  property :pwdigest
  property :session_token, index: :exact, constraint: :unique
  property :email, constraint: :unique
  property :img_url
  property :fname
  property :lname
  property :location
  property :created_at
  property :updated_at
  
  validates :username, :session_token, presence: true
  validates :username, :email, :session_token, uniqueness: true
  validates :pwdigest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  
  attr_reader :password
  
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.valid_password?(password) ? return user : return nil
  end
  
  def reset_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save
    self.session_token
  end
  
  def password=(password)
    @password = password
    self.pwdigest = BCrypt::Password.create(password)
  end
  
  def valid_password?(password)
    BCrypt::Password.new(self.pwdigest).is_password?(password)
  end
  
  private
  
  def ensure_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
  
  def ensure_password_confirmation
    self.password == self.password_confirmation
  end

end
