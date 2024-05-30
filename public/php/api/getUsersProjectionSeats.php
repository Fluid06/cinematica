<?php
if($_GET["key"] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==')
{
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    if($_SERVER["REQUEST_METHOD"] == "GET")
    {
        require_once "./../includes/Reservation.php";

        $cusID = $_GET["customer"];
        $proID = $_GET["projection"];
        $response = "";

        Reservation::download("SELECT * FROM `reservation` WHERE `ID-customer` = ".$cusID." AND `ID-projection` = ".$proID.";");

        if(!empty(Reservation::$error || !empty(Projection::$error) || !empty(Seat::$error)))
        {
            $response = ["success" => false, "data" => [Reservation::$error, Projection::$error, Seat::$error]];
        }
        else
        {
            $response = ["success" => true, "data" => Reservation::$data];
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY);
    }
}
else
{
    header("Location: /");
}

?>