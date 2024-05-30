<?php
require_once "./../includes/Reservation.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        $id = $_POST['reservation'];
        $sql = "SELECT * FROM `reservation` WHERE `ID` = ".$id.";";
        Reservation::download($sql);
        Reservation::$data[0]->delete();

        if (!empty(Reservation::$error)) 
        {
            $response = [Reservation::$error];
        }
        else 
        {    
            $response = "success";
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY); 
    }
}