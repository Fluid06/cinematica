<?php
require_once "./../includes/Projection.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');

        $id = $_POST['id'];

        Projection::download("SELECT * FROM `projection` WHERE `ID` = ".$id.";");
        Projection::$data[0]->delete();

        if (!empty(Projection::$error)) 
        {
            $response = [Projection::$error];
        }
        else 
        {    
            $response = "success";
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY); 
    }
}