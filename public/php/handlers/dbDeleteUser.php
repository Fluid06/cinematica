<?php
require_once "./../includes/Customer.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') {
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        $id = $_POST['id'];

        Customer::download("SELECT * FROM `customer` WHERE `ID` = ".$id.";");
        Customer::$data[0]->delete();

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