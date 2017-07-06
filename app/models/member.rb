class Member < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :mirror

  attr_accessor :mirror_codename, :mirror_password

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
  validate :correct_mirror_password

  def correct_mirror_password
    unless self.mirror.valid_password?(mirror_password)
      errors.add(:mirror_password, 'for this mirror is incorrect.')
    end
  end

end
