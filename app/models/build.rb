class Build < ApplicationRecord
  has_many :rooms
  has_many :pre_reserves, through: :rooms
  belongs_to :reserve, optional: true
  belongs_to :user

  validates :name, :postal_code, :address, :building, presence: true
  validates :name, length: { maximum: 30 }
end
