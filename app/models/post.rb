class Post < ApplicationRecord
    belongs_to :user
    has_many :comments

    has_many :post_tags
    has_many :tags, through: :post_tags
    validates :blog, presence: true
    validates :title, presence: true
end
