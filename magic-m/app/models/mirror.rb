class Mirror < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :members

  validates :codename, presence: true,
                       uniqueness: true,
                       length: { minimum: 4 }
end
