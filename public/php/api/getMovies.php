<?php
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') {
    require_once "Movie.php";
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    Movie::download();

    if (!empty(Movie::$error)) 
    {
        $response = Movie::$error;
    }
    else 
    {    
        $response = Movie::$data;
    }

    echo json_encode($response, JSON_OBJECT_AS_ARRAY);
} else {
    header('Location: /');
}