<?php
require_once "Movie.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    Movie::download("SELECT DISTINCT `movie`.* FROM `projection` inner join `movie` on `projection`.`ID-movie` = `movie`.`ID` WHERE DATE(`projection`.`start_time`) = CURDATE() OR DATE(`projection`.`start_time`) = DATE_ADD(CURDATE(), INTERVAL 1 DAY) OR DATE(`projection`.`start_time`) = DATE_ADD(CURDATE(), INTERVAL 2 DAY)");

    if (!empty(Movie::$error)) 
    {
        $response = Movie::$error;
    }
    else 
    {    
        $response = Movie::$data;
    }

    echo json_encode($response, JSON_OBJECT_AS_ARRAY); 
} 
else 
{
    header('Location: /');
}

?>