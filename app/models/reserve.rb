class Reserve < ApplicationRecord
  has_many :pre_reserves
  has_one :rentalspace, through: :pre_reserve

  validates :total_price, numericality: { greater_than: 0 }

  def save_with_update_pre_reserves!(pre_reserves)
    ActiveRecord::Base.transaction do
      pre_reserves.each do |pre_reserve|
        pre_reserve.update_attributes!(active: false, reserve: self)
      end
      self.save!
    end
  end
end
