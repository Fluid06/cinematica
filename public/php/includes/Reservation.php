<?php

require_once "Customer.php";
require_once "Projection.php";
require_once "Seat.php";

class Reservation
{
    public $ID;
    public $projection;
    public $seats = [];

    public static $data = [];
    public static $error = [];

function __set($name, $value)
{
    if (isset($this->$name)) 
    {
        $this->$name = $value;
    }
}

function __get($name)
{
    if (isset($this->$name)) 
    {
        return $this->$name;
    }
}

function __construct($ID, $projection, $seats)
{
    $this->ID = $ID;
    $this->projection = $projection;
    foreach($seats as $seat)
    {
        $this->seats[] = $seat;
    }
}

public function upload($customer_id)
{
    $server_name = "innodb.endora.cz:3306";
    $username = "houskasesalamem";
    $password = "Houskasesalamemjedobra123";
    $dbname = "kinocinematica";

    $conn = new mysqli($server_name, $username, $password, $dbname);
    if($conn->connect_error)
    {
        self::$error[] = "upload: No connection: $conn->connect_error";
        return;
    }
    
    $sql="INSERT INTO `reservation`(`ID-customer`, `ID-projection`) VALUES(?, ?);";

    $stmt = $conn->prepare($sql);
    if (!$stmt) 
    {
        self::$error[] = "upload: Prepare failed: $conn->error";
        return;
    }

    $stmt->bind_param("ii", $customer_id, $this->projection->ID);
    if (!$stmt->execute()) 
    {
        self::$error[] = "upload: No upload: $stmt->error";
        return;
    }
    $reservation_id = $conn->insert_id;
    $stmt->close();

    $sql="INSERT INTO `reservation_seat`(`seat_row`, `seat_number`, `seat_ID-hall`, `ID-projection`, `reservation_ID`) VALUES(?, ?, ?, ?, ?);";

    foreach($this->seats as $seat)
    {
        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "upload: Prepare failed: $conn->error";
            return;
        }

        $stmt->bind_param("siiii", $seat->row, $seat->number, $seat->hall->ID, $this->projection->ID, $reservation_id);
        if (!$stmt->execute()) 
        {
            self::$error[] = "upload: No upload: $stmt->error";
            return;
        }
    }

    $conn->close();

}

public function delete()
{
    $server_name = "innodb.endora.cz:3306";
    $username = "houskasesalamem";
    $password = "Houskasesalamemjedobra123";
    $dbname = "kinocinematica";

    $conn = new mysqli($server_name, $username, $password, $dbname);
    if($conn->connect_error)
    {
        self::$error[] = "delete: No connection: $conn->connect_error";
        return;
    }

    $sql = "DELETE FROM `reservation_seat` WHERE `reservation_ID` = ".$this->ID.";";
    $stmt = $conn->prepare($sql);
    if (!$stmt) 
    {
        self::$error[] = "delete: Prepare failed: $conn->error";
        return;
    }

    if (!$stmt->execute()) 
    {
        self::$error[] = "delete: No execute: $stmt->error";
        return;
    }

    $sql = "DELETE FROM `reservation` WHERE `ID` = ".$this->ID.";";
    $stmt = $conn->prepare($sql);
    if (!$stmt) 
    {
        self::$error[] = "delete: Prepare failed: $conn->error";
        return;
    }

    if (!$stmt->execute()) 
    {
        self::$error[] = "delete: No execute: $stmt->error";
        return;
    }

    $stmt->close();
    $conn->close();
    
}

public static function download($sql = "SELECT * FROM `reservation`")
{
    $server_name = "innodb.endora.cz:3306";
    $username = "houskasesalamem";
    $password = "Houskasesalamemjedobra123";
    $dbname = "kinocinematica";

    $conn = new mysqli($server_name, $username, $password, $dbname);
    if($conn->connect_error)
    {
        self::$error[] = "download: No connection: $conn->connect_error";
        return;
    }

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        self::$error[] = "download: Prepare failed: $conn->error";
        return;
    } 

    if (!$stmt->execute()) 
    {
        self::$error[] = "download: No execute: $stmt->error";
        return;
    }

    $result = $stmt->get_result();
    
    while($row = $result->fetch_assoc()) 
    {
        Seat::download("SELECT * 
        FROM `seat`
        WHERE (`row`, `number`, `ID-hall`) IN
        (
            SELECT `seat_row`, `seat_number`, `seat_ID-hall`
            FROM `reservation_seat`
            WHERE `reservation_ID` = ".$row["ID"]."
        );");
        Projection::download("SELECT * FROM `projection` WHERE `ID` = ".$row["ID-projection"].";");
        $reservation = new Reservation($row["ID"], Projection::$data[0], Seat::$data);
        self::$data[] = $reservation;
        
        Seat::$data = [];
        Projection::$data = [];
    }

    $stmt->close();
    $conn->close();
}

}

?>