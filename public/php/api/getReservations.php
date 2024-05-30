<?php
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    require_once "./../includes/Reservation.php";
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    Reservation::download();

    if (!empty(Reservation::$error) || !empty(Customer::$error) || !empty(Projection::$error) || !empty(Seat::$error)) 
    {
        $response = Reservation::$error;
    }
    else 
    {    
        $response = Reservation::$data;
    }

    echo json_encode($response, JSON_OBJECT_AS_ARRAY); 
}

else 
{
    header('Location: /');
}

