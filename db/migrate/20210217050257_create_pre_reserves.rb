class CreatePreReserves < ActiveRecord::Migration[6.1]
  def change
    create_table :pre_reserves do |t|
      t.integer :count, null: false, default: 0
      t.boolean :active, null: false, default: false
      t.references :room, null: false, foreign_key: true
      t.references :build, null: false, foreign_key: true
      t.references :reserve, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
