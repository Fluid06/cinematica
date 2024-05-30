<?php

include "Movie.php";

class Projection
{
    public $ID;
    public $movie;
    public $hall;
    public $price;
    public $is_3D;
    public $start_time;
    public $end_time;
    public $language;

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

    function __construct($ID, $movie, $hall, $price, $is_3D, $start_time, $end_time, $language)
    {
        $this->ID = $ID;
        $this->movie = $movie;
        $this->hall = $hall;
        $this->price = $price;
        $this->is_3D = $is_3D;
        $this->start_time = $start_time;
        $this->end_time = $end_time;
        $this->language = $language;
    }

    function upload()
    {
        $server_name = "innodb.endora.cz:3306";
        $username = "houskasesalamem";
        $password = "Houskasesalamemjedobra123";
        $dbname = "kinocinematica";

        $conn = new mysqli($server_name, $username, $password, $dbname);
        if($conn->connect_error)
        {
            self::$error[] = "upload: No connection: $conn->connect_error";
            exit();
        }

        $sql = "INSERT INTO `projection` (`ID-movie`, `ID-hall`, `prize`, `3D`, `start_time`, `end_time`, `language`) 
        VALUES (?, ?, ?, ?, ?, ?, ?);";

        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "upload: Prepare failed: $conn->error";
            exit();
        }

        $stmt->bind_param("iiiisss", $this->movie->ID, $this->hall->ID, $this->price, $this->is_3D, $this->start_time, $this->end_time, $this->language);
        if (!$stmt->execute()) 
        {
            self::$error[] = "upload: No upload: $stmt->error";
            exit();
        }
        $stmt->close();
        $conn->close();
    }

    public static function download($sql = "SELECT * FROM `projection`")
    {

        $server_name = "innodb.endora.cz:3306";
        $username = "houskasesalamem";
        $password = "Houskasesalamemjedobra123";
        $dbname = "kinocinematica";

        $conn = new mysqli($server_name, $username, $password, $dbname);
        if($conn->connect_error)
        {
            self::$error[] = "download: No connection: $conn->connect_error";
            exit();
        }

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            self::$error[] = "download: Prepare failed: $conn->error";
            exit();
        }

        if (!$stmt->execute()) 
        {
            self::$error[] = "download: No execute: $stmt->error";
            exit();
        }

        $result = $stmt->get_result();
        while($row = $result->fetch_assoc()) 
        {
            Movie::download("SELECT * FROM `movie` WHERE `ID` = ".$row["ID-movie"].";");

            $projection = new Projection($row["ID"], Movie::$data[0], $row["ID-hall"], $row["price"], $row["3D"], $row["start_time"], $row["end_time"], $row["language"]);
            Movie::$data = [];
            self::$data[] = $projection;
        }

        $stmt->close();
        $conn->close();
    }

}

?>