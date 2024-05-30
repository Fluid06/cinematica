<?php
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') {
    require_once "Genre.php";
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    Genre::download();

    if (!empty(Genre::$error)) 
    {
        $response = Genre::$error;
    }
    else 
    {    
        $response = Genre::$data;
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
    header('Location: /');
}