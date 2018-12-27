class UpdateTapStatus < ActiveRecord::Migration
  def up
  	execute " 
	    DELIMITER $$
 
DROP PROCEDURE IF EXISTS `change_tap_status`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `change_tap_status`(
IN reciever_username VARCHAR(50),
IN tap_id_arg TEXT, 
IN created_timestamp TIMESTAMP,
IN status_type VARCHAR(20)
)
BEGIN  
        DECLARE reciever_id_arg INTEGER;
        DECLARE tap_id_arr TEXT;
        DECLARE current_tap_id TEXT;
        
      SELECT id  INTO reciever_id_arg FROM users  WHERE username = reciever_username; 
      
    IF (status_type = 'read') 
       THEN   
     UPDATE tap_user_mapping SET isViewed = TRUE,viewedTimestamp = created_timestamp
      WHERE tap_id = tap_id_arg AND reciever_id = reciever_id_arg;
      
      ELSE
	SET tap_id_arr = tap_id_arg;	
	WHILE (LOCATE(',', tap_id_arr) > 0)
	DO
	    SET current_tap_id = LEFT(tap_id_arr,LOCATE(',',tap_id_arr) - 1);
	    SET tap_id_arr = SUBSTRING(tap_id_arr,LOCATE(',',tap_id_arr) + 1); 
	          UPDATE tap_user_mapping SET status_id = 2,unlocked_timestamp = created_timestamp
      WHERE tap_id = current_tap_id AND reciever_id = reciever_id_arg;
	    
	     
	END WHILE; 
      
      UPDATE tap_user_mapping SET status_id = 2,unlocked_timestamp = created_timestamp
      WHERE tap_id = tap_id_arr AND reciever_id = reciever_id_arg;
 END IF;
 END$$

DELIMITER ;
		"
  end

  def down
  	
  end
end
