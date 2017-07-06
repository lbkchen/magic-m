class Mirror < ApplicationRecord
  has_many :members
  validates :codename, prescence: true,
                       length: { minimum: 4 }
end
