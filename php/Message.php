<?php
require_once("db.php");
require_once("utils.php");

class Message extends db {

	var $con;
	
	public function __construct(){
		parent::dbInstance();
	}
	
	// Retourne des messages suivant l'id d'une ville
	public function getMessages($cityId){
		if($cityId == "0"){
		    $qry = mysql_query("SELECT * FROM message ORDER BY message_date DESC");
        }else{
            $qry = mysql_query("SELECT * FROM message WHERE city_id = ".$cityId." ORDER BY message_date DESC");
        }
		$data = array();
		
        while($rows = mysql_fetch_array($qry)){
            $data[] = array("id" => $rows['id'],
                          "city_id" => $rows['city_id'],
                          "message_text" => $rows['message_text'],
                          "message_author" => $rows['message_author'],
                          "message_author_twitter" => $rows['message_author_twitter'],
                          "message_date" => $rows['message_date']);
        }
        return json_encode(utf8json($data));
	}
	
	// Ajoute un message
	public function addMessage($post){
		$message_text = utf8_decode(mysql_real_escape_string($post['message_text']));
		$city_id = mysql_real_escape_string($post['city_id']);
		$message_author = utf8_decode(mysql_real_escape_string($post['message_author']));
		$message_author_twitter = utf8_decode(mysql_real_escape_string($post['message_author_twitter']));
		if(strlen($message_author_twitter) == 0){
            $message_author_twitter = preg_replace('/\s+/', '', $message_author);
        }
		$message_date = date('Y-m-d H:i:s', time());
		$id = 0;
		$qry = mysql_query("INSERT INTO message(city_id,message_text,message_author,message_author_twitter,message_date)VALUES('{$city_id}','{$message_text}','{$message_author}', '{$message_author_twitter}','{$message_date}')")or die(mysql_error());
		$id = mysql_insert_id();
		return json_encode(utf8json(array("id" => $id,
						  		 "city_id" => $city_id,
						  		 "message_text" => stripslashes($message_text),
						  		 "message_author" => stripslashes($message_author),
						  		 "message_author_twitter" => stripslashes($message_author_twitter),
						  		 "message_date" => $message_date)));
	}
	
	// Supprime un message suivant l'id d'une ville
	public function deleteMessage($id){
		(int)$id = mysql_escape_smysql_real_escape_stringtring($id);
		$del = mysql_query("DELETE FROM message WHERE id = ".$id);
		if($del)
			return true;
		return false;
	}
	
}
?>