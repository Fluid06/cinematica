<?php
require_once "./../includes/Projection.php";
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    $today;
    $tomorrow;
    $doubleTomorrow;
    $response;

    Projection::download("SELECT * FROM `projection` WHERE DATE(`start_time`) = CURDATE();");
    $today = Projection::$data;
    Projection::$data = [];

    Projection::download("SELECT * FROM `projection` WHERE DATE(`start_time`) = DATE_ADD(CURDATE(), INTERVAL 1 DAY);");
    $tomorrow = Projection::$data;
    Projection::$data = [];

    Projection::download("SELECT * FROM `projection` WHERE DATE(`start_time`) = DATE_ADD(CURDATE(), INTERVAL 2 DAY);");
    $doubleTomorrow = Projection::$data;
    Projection::$data = [];

    if (!empty(Projection::$error)) 
    {
        $response = ["success"=>false, "errors"=>Projection::$error];
    }
    else 
    {    
        $response = ["success"=>true, "data"=>[$today, $tomorrow, $doubleTomorrow]];
    }

    echo json_encode($response, JSON_OBJECT_AS_ARRAY); 
} 
else 
{
    header('Location: /');
}

?>