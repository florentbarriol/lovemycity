<?php
class db {
    /* localhost */
	const SERVER = "localhost";
	const USER = "root";
	const PASSWORD = "";
	const DB = "lovemycity";
	
	
    /* online */
    /*
	const SERVER = "localhost";
	const USER = "florent0_lmcUser";
	const PASSWORD = "!qH]qycD7(uO";
	const DB = "florent0_lovemycity";
	*/
	
	private static $instance = NULL;
	private $connection;
	
	private function __construct(){
		$this->connection = mysql_connect(self::SERVER, self::USER, self::PASSWORD);
		if($this->connection){
			mysql_select_db(self::DB, $this->connection);
		}
	}
	
	private function __clone(){
		// to avoid cloning this class
	}
	
	protected static function dbInstance(){
		if(NULL == self::$instance){
			self::$instance = new self;
		}
		return self::$instance;
	}
}
?>