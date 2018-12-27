class GetTaps < ActiveRecord::Migration
  def up
  	execute " 
	   DELIMITER $$
 

DROP PROCEDURE IF EXISTS `get_tap_list`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_tap_list`(
IN reciever_username VARCHAR(50)
)
BEGIN 
	DECLARE reciever_id_arg INTEGER;
        
      SELECT id  INTO reciever_id_arg FROM users  WHERE username = reciever_username;
	
	 
	(SELECT taps.id, username AS sender_username,latitude,longitude,taps.content AS message,first_name,
	contact_number AS sender_contact ,lock_upto,is_anonymous,location,taps.created_timestamp,users.last_name,
	GROUP_CONCAT(DISTINCT JSON_OBJECT('asset',tap_assets.content,'type',asset_type_id,'seq',seq)) AS assets,tap_user_mapping.status_id AS status_id,
	isViewed
	FROM tap_user_mapping INNER JOIN taps ON tap_user_mapping.tap_id = taps.id
	INNER JOIN users ON sender_id = users.id
	INNER JOIN tap_assets ON taps.id = tap_assets.tap_id
	WHERE tap_user_mapping.reciever_id=reciever_id_arg AND tap_user_mapping.status_id=2 AND isViewed = FALSE
	GROUP BY username,latitude,longitude,taps.content,tap_user_mapping.status_id,
	contact_number,lock_upto,taps.id,isViewed
	ORDER BY created_timestamp ASC)
	UNION
	(SELECT taps.id, username AS sender_username,latitude,longitude,taps.content AS message,first_name,
	contact_number AS sender_contact ,lock_upto,is_anonymous,location,taps.created_timestamp,users.last_name,
	GROUP_CONCAT(DISTINCT JSON_OBJECT('asset',tap_assets.content,'type',asset_type_id,'seq',seq)) AS assets,tap_user_mapping.status_id AS status_id,
	isViewed
	FROM tap_user_mapping INNER JOIN taps ON tap_user_mapping.tap_id = taps.id
	INNER JOIN users ON sender_id = users.id
	INNER JOIN tap_assets ON taps.id = tap_assets.tap_id
	WHERE tap_user_mapping.reciever_id=reciever_id_arg AND tap_user_mapping.status_id=1
	GROUP BY username,latitude,longitude,taps.content,tap_user_mapping.status_id,
	contact_number,lock_upto,taps.id,isViewed
	ORDER BY lock_upto ASC)
	UNION
	(SELECT taps.id, username AS sender_username,latitude,longitude,taps.content AS message,first_name,
	contact_number AS sender_contact ,lock_upto,is_anonymous,location,taps.created_timestamp,users.last_name,
	GROUP_CONCAT(DISTINCT JSON_OBJECT('asset',tap_assets.content,'type',asset_type_id,'seq',seq)) AS assets,tap_user_mapping.status_id AS status_id,
	isViewed
	FROM tap_user_mapping INNER JOIN taps ON tap_user_mapping.tap_id = taps.id
	INNER JOIN users ON sender_id = users.id
	INNER JOIN tap_assets ON taps.id = tap_assets.tap_id
	WHERE tap_user_mapping.reciever_id=reciever_id_arg AND tap_user_mapping.status_id=2 AND isViewed = TRUE
	GROUP BY username,latitude,longitude,taps.content,tap_user_mapping.status_id,
	contact_number,lock_upto,taps.id,isViewed
	ORDER BY created_timestamp ASC);
 END$$

DELIMITER ;
		"
  end

  def down
  	
  end
end