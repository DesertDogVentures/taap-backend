class UpdateAssetTable < ActiveRecord::Migration
  def up
  	execute " 
	  ALTER TABLE tap_assets
		ADD asset_type_id INTEGER DEFAULT 1;
		"
  end

  def down
  	
  end
end