class Room < ApplicationRecord
  belongs_to :build
  belongs_to :reserve, optional: true
  has_one :pre_reserve
end
