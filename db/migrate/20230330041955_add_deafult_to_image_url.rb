class AddDeafultToImageUrl < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :image_url, :string, :default =>"https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-unidentified-user-illustration-mysterious-social-png-image_4816405.png"
  end
end
