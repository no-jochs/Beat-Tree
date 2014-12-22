class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|

      t.timestamps
    end
  end
end
