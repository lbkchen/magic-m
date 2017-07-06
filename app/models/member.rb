class Member < ApplicationRecord
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

  validates :username, prescence: true,
                       length: { minimum: 4 }
end
