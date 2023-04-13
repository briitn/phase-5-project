class AddViewsToTags < ActiveRecord::Migration[6.1]
  def change
    reversible do |dir|
      dir.up do
        add_column :tags, :views, :integer
      end

      dir.down do
        add_column :tags, :views, :integer
      end
    end
  end

end

