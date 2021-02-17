class CreateRentalspaces < ActiveRecord::Migration[6.1]
  def change
    create_table :rentalspaces do |t|
      t.string :name, null: false
      t.string :postal_code, null: false
      t.string :address, null: false
      t.string :building,null:false
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
