class CreateDrafts < ActiveRecord::Migration[6.1]
  def change
    create_table :drafts do |t|

      t.timestamps
    end
  end
end
