<?php
require_once "./../includes/Customer.php";
require_once "./../includes/CustomeSession.php";

if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        header('Access-Control-Allow-Origin: *');
        
        $email = $_POST["email"];
        $password = $_POST["pwd"];
        $response = [];

        Customer::download("SELECT * FROM `customer` WHERE `email` = ".$email.";");

        if(count(Customer::$data) == 1)
        {
            if(Customer::$data[0]->password != password_hash($password, PASSWORD_DEFAULT))
            {
                $response[] = "Tato hesla se neshodují";
            }
            else
            {
                CustomSession::start();
                CustomSession::set("user", Customer::$data[0]);
            }
        }
        else
        {
            $response[] = "Tento uživatel neexistuje";
        }

        if(!empty(Customer::$error || !empty(Reservation::$error)))
        {
            $response[] = Customer::$error;
            $response[] = Reservation::$error;
        }

        if(empty($response))
        {
            $response[] = "success";
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY);
    }
}

?>