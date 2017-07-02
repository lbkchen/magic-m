class CreateMirrors < ActiveRecord::Migration[5.1]
  def change
    create_table :mirrors do |t|
      t.string :codename

      t.timestamps
    end
  end
end
