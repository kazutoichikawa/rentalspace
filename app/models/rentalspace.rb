class Rentalspace < ApplicationRecord
  has_many :rooms
  has_many :pre_reserves, through: :rooms
  belongs_to :reserve, optional: true

  validates :name, :postal_code, :address, :building, presence: true
  validates :name, length: { maximum: 30 }
  validates :fee, numericality: { greater_than: 0 }
end
