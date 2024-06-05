<?php
if($_GET["key"] == "SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==")
{
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        require_once "./../includes/Reservation.php";
        require_once "./../includes/Seat.php";
        require_once "./../includes/Projection.php";
        require_once "./../includes/Hall.php";

        header('Access-Control-Allow-Origin: *');

        $cusID = $_POST["customer"];
        $proID = $_POST["projection"];
        $hallID = $_POST["hall"];
        $seats = $_POST["seats"];

        $in = "('".implode("','" ,$seats)."')";

        Projection::download("SELECT * FROM `projection` WHERE `ID` = ".$proID.";");
        Seat::download("SELECT * FROM `seat` WHERE `ID-hall` = ".$hallID." AND CONCAT(`row`, `number`) in ".$in.";"); 

        $projection = Projection::$data[0];
        $hall = new Hall($hallID);
        $seatss = Seat::$data;
        $reservation = new Reservation(0, $projection, $seatss);

        $reservation->upload($cusID);
        
        $response = "";
        if(!empty(Projection::$error) || !empty(Hall::$error) || !empty(Seat::$error) || !empty(Reservation::$error))
        {
            $response = [Projection::$error, Hall::$error, Seat::$error];
        }
        else
        {
            $response = "success";
        }
        
        echo json_encode($response, JSON_OBJECT_AS_ARRAY);
        
    }
}
else
{
    echo "špatný klíč";
}

?>