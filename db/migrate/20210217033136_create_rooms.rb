class CreateRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :rooms do |t|
      t.string :name, null: false
      t.text :detail, null:false
      t.integer :capacity, null: false
      t.integer :price, null: false
      t.references :rentalspace, null: false, foreign_key: true
      t.timestamps
    end
  end
end
