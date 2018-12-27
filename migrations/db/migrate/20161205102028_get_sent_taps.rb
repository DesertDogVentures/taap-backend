class GetSentTaps < ActiveRecord::Migration
  def up
  	execute " 
	   DELIMITER $$
 

DROP PROCEDURE IF EXISTS `get_sent_tap_list`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_sent_tap_list`(
IN sender_username VARCHAR(50)
)
BEGIN 
	DECLARE sender_id_arg INTEGER;
        
      SELECT  id  INTO sender_id_arg FROM users  WHERE username = sender_username;
	SELECT  taps.id,latitude,longitude,taps.content AS message,
	unlocked_timestamp,location,taps.created_timestamp,
	GROUP_CONCAT(DISTINCT JSON_OBJECT('asset',tap_assets.content,'type',asset_type_id,'seq',seq)) AS assets,
	GROUP_CONCAT(DISTINCT JSON_OBJECT('first_name', first_name,'last_name',last_name,'username',username)) users
	FROM tap_user_mapping INNER JOIN taps ON tap_user_mapping.tap_id = taps.id
	INNER JOIN users ON reciever_id = users.id
	INNER JOIN tap_assets ON taps.id = tap_assets.tap_id
	WHERE tap_user_mapping.sender_id=sender_id_arg
	GROUP BY latitude,longitude,location,taps.content,unlocked_timestamp,taps.id
	ORDER BY taps.id DESC;
 END$$

DELIMITER ;
		"
  end

  def down
  	
  end
end