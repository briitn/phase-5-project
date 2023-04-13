class AddViewsToPosts < ActiveRecord::Migration[6.1]
  def change
    reversible do |dir|
      dir.up do
        add_column :posts, :views, :integer
      end
  
      dir.down do
        add_column :posts, :views, :integer
      end
    end
  end
end
