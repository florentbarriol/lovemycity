<?php
require_once("db.php");
require_once("utils.php");

class City extends db {

	var $con;
	
	public function __construct(){
		parent::dbInstance();
	}
	
	public function getCities(){
		$qry = mysql_query("SELECT * FROM city");
		$data = array();
		while($rows = mysql_fetch_array($qry)){
			$data[] = array("id" => $rows['id'],
						  "city_name" => $rows['city_name'],
						  "city_text" => $rows['city_text'],
						  "city_picture" => $rows['city_picture']);
		}
		return json_encode(utf8json($data));
	}
	
    public function getCity($cityId){
		$qry = mysql_query("SELECT * FROM city WHERE id = ".$cityId."");
		$data = array();
		while($rows = mysql_fetch_array($qry)){
			$data[] = array("id" => $rows['id'],
						  "city_name" => $rows['city_name'],
						  "city_text" => $rows['city_text'],
						  "city_picture" => $rows['city_picture']);
		}
		return json_encode(utf8json($data));
	}
	
	public function addCity($post){
		/*$comments = mysql_escape_string($post['msg']);
		$time = time();
		$id = 0;
		$qry = mysql_query("INSERT INTO message(message_text,message_date)VALUES('{$messages}','{$time}')")or die(mysql_error());
		$id = mysql_insert_id();
		return json_encode(array("id" => $id,
						  		 "message_text" => stripslashes($comments),
						  		 "message_date" => $time));*/
	}
	
}
?>