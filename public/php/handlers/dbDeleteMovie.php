<?php
require_once "./../includes/Movie.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        $id = $_POST['id'];
        $sql = "SELECT * FROM `movie` WHERE `ID` = ".$id.";";
        Movie::download($sql);
        Movie::$data[0]->delete();

        if (!empty(Movie::$error) || !empty(Image::$error) || !empty(Genre::$error) || !empty(Projection::$error)) 
        {
            $response = [Movie::$error, Image::$error, Genre::$error, Projection::$error];
        }
        else 
        {    
            $response = "success";
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY); 

    }
}