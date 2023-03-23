class PostSerializer < ActiveModel::Serializer
  attributes :id, :blog, :likes, :title, :views

  belongs_to :user
  has_many :comments
  has_many :post_tags
    has_many :tags, through: :post_tags
end
