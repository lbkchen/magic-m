class Member < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :mirror

  enum activity: [
    :home,
    :work,
    :school,
    :groceries,
    :shopping,
    :partying,
    :adventuring,
    :unknown,
  ]

  validates :username, presence: true,
                       length: { minimum: 4 }
end
