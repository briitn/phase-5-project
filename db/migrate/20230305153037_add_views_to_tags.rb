class AddViewsToTags < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :views, :integer
  end
end
