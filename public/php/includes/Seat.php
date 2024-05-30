<?php

require_once "Hall.php";

class Seat
{
    public $row;
    public $number;
    public $hall;
    public $invalid;
    public $charge;

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

    function __construct($row, $number, $hall, $invalid, $charge)
    {
        $this->row = $row;
        $this->number = $number;
        $this->hall = $hall;
        $this->invalid = $invalid;
        $this->charge = $charge;
    }

    public static function download($sql = "SELECT * FROM `seat`")
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
            Hall::download("SELECT * FROM `hall` WHERE `ID` = ".$row["ID-hall"].";");

            $seat = new Seat($row["row"], $row["number"], Hall::$data[0], $row["invalid"], $row["charge"]);
            self::$data[] = $seat;

            Hall::$data = [];
        }

        $stmt->close();
        $conn->close();
    }
}

?>