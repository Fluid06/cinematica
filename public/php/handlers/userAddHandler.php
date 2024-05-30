<?php
require_once "./../includes/Customer.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') {
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        header('Access-Control-Allow-Origin: *');

        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $phoneNumber = $_POST['phoneNumber'];
        $birthdate = $_POST['birthdate'];
        $is_admin = $_POST['is_admin'];
        $pass = $_POST['pass'];
        $passAgain = $_POST['passAgain'];

        $response = "";

        if($pass!=$passAgain)
        {
            $response = "Hesla ne neshodují";
            echo json_encode($response, JSON_OBJECT_AS_ARRAY);
            exit();
        }
        $pass = password_hash($pass, PASSWORD_DEFAULT);

        $customer = new Customer(0, $name, $surname, $birthdate, $phoneNumber, $email, $pass, $is_admin, null);
        $customer->upload();
        
        if(!empty(Customer::$error))
        {
            $response = Customer::$error;
        }
        else
        {
            $response = "Success";
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY);

    }
}