<?php 
require_once "../includes/Seat.php";

if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    $id = $_GET['id'];

    Seat::download("SELECT * FROM `seat` WHERE `ID-hall` = ".$id.";");
    $response;
        
    if(!empty(Seat::$error) && !empty(Hall::$error))
    {
        $response = [Seat::$error, Hall::$error];
    }
    else
    {
        $response = Seat::$data;
    }
    echo json_encode($response, JSON_OBJECT_AS_ARRAY); 

} 
else 
{
    header('Location: /');
}