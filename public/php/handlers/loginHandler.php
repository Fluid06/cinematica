<?php
require_once "./../includes/Customer.php";

if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        header('Access-Control-Allow-Origin: *');
        
        $email = $_POST["email"];
        $password = $_POST["pwd"];

        Customer::download("SELECT * FROM `customer` WHERE `email` = '" . $email . "';");

        if(count(Customer::$data) == 1)
        {
            if(!password_verify($password, Customer::$data[0]->password))
            {
                $response = "password_error_occured";
            }
        }
        else
        {
            $response = "account_error_occured";
        }

        if(empty($response))
        {
            $response = Customer::$data;
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY);
    }
} else {
    header('Location: /');
}

?>