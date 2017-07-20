class CreateMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :members do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.references :mirror, foreign_key: true

      t.timestamps
    end
  end
end
