<?php
require_once "./../includes/Movie.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') {
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');

        $id = $_POST['id']; 

        Movie::download("SELECT * FROM `movie` WHERE `ID` = ".$id.";");
        Movie::$data[0]->delete();

        if (!empty(Movie::$error)) 
        {
            $response = Movie::$error;
        }
        else 
        {    
            $response = "success";
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY); 

    }
}