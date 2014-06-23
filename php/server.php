<?php
    header('Content-Type: application/json');
    mb_internal_encoding('UTF-8');
    date_default_timezone_set('Europe/Paris');
    require_once("Message.php");
    require_once("City.php");
    
    $message = new Message();
	$city = new City();
	
	if(isset($_GET['action'])){
        switch($_GET['action']){
            case "getMessages":
                if(isset($_GET['cityId'])){
                    echo $message->getMessages($_GET['cityId']);
                }else{
                    echo $message->getMessages("0", "5");
                }
            break;
            
            case "deleteMessage":
                $message->deleteMessage($_GET['id']);
            break;
            
            case "getCities":
                echo $city->getCities();
            break;
            
            case "getCity":
                if(isset($_GET['cityId'])){
                    echo $city->getCity($_GET['cityId']);
                }else{
                    echo $message->getMessages("0");
                }
            break;
            /*
            case "getNumberMessages":
                if(isset($_GET['cityId'])){
                    echo $message->getNumberMessages($_GET['cityId']);
                }
            break;*/
            
            
        }
    }
    //var_dump($_GET);
    if(isset($_POST) && $_SERVER['REQUEST_METHOD'] == "POST" && $_POST['action'] == "addMessage"){
		echo $message->addMessage($_POST);
		exit;
	}
	
?>