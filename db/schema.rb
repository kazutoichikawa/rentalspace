# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_17_033155) do

  create_table "pre_reserves", charset: "utf8", force: :cascade do |t|
    t.integer "count", default: 0, null: false
    t.boolean "active", default: false, null: false
    t.bigint "room_id", null: false
    t.bigint "rentalspace_id", null: false
    t.bigint "reserve_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["rentalspace_id"], name: "index_pre_reserves_on_rentalspace_id"
    t.index ["reserve_id"], name: "index_pre_reserves_on_reserve_id"
    t.index ["room_id"], name: "index_pre_reserves_on_room_id"
    t.index ["user_id"], name: "index_pre_reserves_on_user_id"
  end

  create_table "rentalspaces", charset: "utf8", force: :cascade do |t|
    t.string "name", null: false
    t.string "postal_code", null: false
    t.string "address", null: false
    t.string "building", null: false
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_rentalspaces_on_user_id"
  end

  create_table "reserves", charset: "utf8", force: :cascade do |t|
    t.integer "total_price", default: 0, null: false
    t.bigint "room_id", null: false
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["room_id"], name: "index_reserves_on_room_id"
    t.index ["user_id"], name: "index_reserves_on_user_id"
  end

  create_table "rooms", charset: "utf8", force: :cascade do |t|
    t.string "name", null: false
    t.text "detail", null: false
    t.integer "capacity", null: false
    t.integer "price", null: false
    t.bigint "rentalspace_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["rentalspace_id"], name: "index_rooms_on_rentalspace_id"
  end

  create_table "users", charset: "utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "f_name", null: false
    t.string "l_name", null: false
    t.string "f_name_r", null: false
    t.string "l_name_r", null: false
    t.string "p_num", null: false
    t.string "company_name", null: false
    t.boolean "admin", default: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "pre_reserves", "rentalspaces"
  add_foreign_key "pre_reserves", "reserves", column: "reserve_id"
  add_foreign_key "pre_reserves", "rooms"
  add_foreign_key "pre_reserves", "users"
  add_foreign_key "rentalspaces", "users"
  add_foreign_key "reserves", "rooms"
  add_foreign_key "reserves", "users"
  add_foreign_key "rooms", "rentalspaces"
end
