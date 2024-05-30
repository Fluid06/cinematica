<?php
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    if($_SERVER["REQUEST_METHOD"] == "GET")
    {
        require_once "./../includes/Seat.php";
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');

        $id = $_GET['id'];
        $response = "";

        Seat::download("select `s`.*
        from `seat` `s` inner join `reservation_seat` `rs` on `s`.`row` = `rs`.`seat_row` AND `s`.`number` = `rs`.`seat_number` AND `s`.`ID-hall` = `rs`.`seat_ID-hall` inner join `projection` `p` on `p`.`ID` = `rs`.`ID-projection`
        where `p`.`ID` = ".$id.";");

        if(!empty(Seat::$error))
        {
            $response = ["success" => false, "data" => Seat::$error];
        }
        else
        {
            $response = ["success" => true, "data" => Seat::$data];
        }

        echo json_encode($response, JSON_OBJECT_AS_ARRAY);
        
    }
}

else 
{
    header('Location: /');
}

?>