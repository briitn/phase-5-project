class AddTitleToPosts < ActiveRecord::Migration[6.1]
  def change
    reversible do |dir|
      dir.up do
        add_column :posts, :title, :string
      end
  
      dir.down do
        add_column :posts, :title, :string
      end
    end
  end
 
end
