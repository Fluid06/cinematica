<?php
require_once "./../includes/Movie.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {

        $ID = $_POST['ID'];
        $name = $_POST['name'];
        $release_date = $_POST['release_date'];
        $length = $_POST['length'];
        $minimum_age = $_POST['minimum_age'];
        $director = $_POST['director_name'];
        $actor = $_POST['main_actor_name'];
        $description = $_POST['description'];

        $response="";

        Movie::download("SELECT * FROM `movie` WHERE `ID` = ".$ID.";");
        Movie::$data[0]->update($name, $release_date, $length, $minimum_age, $director, $actor, $description);

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