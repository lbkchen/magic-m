class AddActivityToMembers < ActiveRecord::Migration[5.1]
  def change
    add_column :members, :activity, :integer, default: 0
  end
end
