<?php
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    require_once "./../includes/Projection.php";
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        header('Access-Control-Allow-Origin: *');

        $id = $_POST["id"];
        $hall = $_POST["hall"];
        $price = $_POST["price"];
        $TD = $_POST["TD"];
        $startTime = $_POST["start_time"];
        $lang = $_POST["lang"];

        Movie::download("SELECT * FROM `movie` WHERE `ID` = ".$id.";");

        $start_time = new DateTime($startTime);
        $end_time = clone $start_time;
        $end_time->modify("+" . Movie::$data[0]->length . " minutes");

        $projection = new Projection(0, Movie::$data[0], new Hall($hall), $price, $TD, $start_time->format("Y-m-d H:i:s"), $end_time->format("Y-m-d H:i:s"), $lang);
        $projection->upload();


        if (!empty(Projection::$error)) 
        {
            $response = Projection::$error;
        } 
        else 
        {    
            $response = "success";
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY); 
    }
}
