<?php


class Genre
{
    public $ID;
    public $name;

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

    function __construct($ID, $name)
    {
        $this->ID = $ID;
        $this->name = $name;
    }

    public static function download($sql = "SELECT * FROM `genre`")
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
            $genre = new Genre($row["ID"], $row["name"]);
            self::$data[] = $genre;
        }

        $stmt->close();
        $conn->close();
    }
}

?>