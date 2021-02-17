class CreateReserves < ActiveRecord::Migration[6.1]
  def change
    create_table :reserves do |t|
      t.integer :total_price, null: false, default: 0
      t.references :room, null: false, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
