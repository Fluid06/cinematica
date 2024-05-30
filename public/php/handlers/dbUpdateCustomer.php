<?php
require_once "./../includes/Customer.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        
        $ID = $_POST['ID'];
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $birthdate = $_POST['birthdate'];
        $phone_number = $_POST['phone_number'];
        $email = $_POST['email'];

        Customer::download("SELECT * FROM `customer` WHERE `ID` = ".$ID.";");
        Customer::$data[0]->update($name, $surname, $birthdate, $phone_number, $email, Customer::$data[0]->password);

        if (!empty(Customer::$error)) 
        {
            $response = Customer::$error;
        }
        else 
        {    
            $response = "success";
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY); 

    }
}