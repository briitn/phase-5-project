class User < ApplicationRecord
    has_secure_password
  
    validates :username, uniqueness: true
    validates :username, presence: true
    has_many :posts
    has_many :comments
end
