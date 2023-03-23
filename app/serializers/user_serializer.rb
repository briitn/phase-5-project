class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :bio, :password_digest

  has_many :comments
  has_many :posts
end
