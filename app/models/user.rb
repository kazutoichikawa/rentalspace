class User < ApplicationRecord
  has_one :build
  has_many :reserves

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
