class PreReserve < ApplicationRecord
  belongs_to :room
  belongs_to :build
  belongs_to :reserve, optional: true

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) }
  scope :other_build, -> (picked_build_id) { where.not(build_id: picked_restaurant_id) }

  def total_amount
    room.price * count
  end
end
