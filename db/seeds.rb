User.create!(
  email: "admin@example.jp",
  f_name: "管理",
  l_name: "者",
  f_name_r: "カンリ",
  l_name_r: "シャ",
  password:  "admin11",
  password_confirmation: "admin11",
  p_num: "08012345678",
  company_name: '株式会社テスト',
  admin: true
)

3.times do |n|
  build = Build.new(
    name: "テストレンタルスペース[#{n-1}]",
    postal_code: "123-4567",
    address: "テスト県テスト市12-3",
    building: "テストビル",
    user_id: 1,
  )

  3.times do |m|
    build.rooms.build(
      name: "ルーム名[#{m}]",
      price: 2000,
      detail: "ルーム_[#{m}]の説明文です。",
      capacity: 3,
    )
  end
  build.save!
end





