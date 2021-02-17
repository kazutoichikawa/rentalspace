class PreReserve < ApplicationRecord
  belongs_to :room
  belongs_to :rentalspace
  belongs_to :reserve, optional: true

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) }
  scope :other_restaurant, -> (picked_rentalspace_id) { where.not(rentalspace_id: picked_restaurant_id) }

  def total_amount
    room.price * count
  end
end
