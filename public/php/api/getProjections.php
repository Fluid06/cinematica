<?php
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') {
    require_once "Projection.php";
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    Projection::download("SELECT  * FROM `projection` WHERE DATE(`projection`.`start_time`) >= CURDATE() ORDER BY `projection`.`start_time` ASC;");

    if (!empty(Projection::$error)) 
    {
        $response = Projection::$error;
    }
    else 
    {    
        $response = Projection::$data;
    }

    echo json_encode($response, JSON_OBJECT_AS_ARRAY); 
} else {
    header('Location: /');
}