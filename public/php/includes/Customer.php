<?php

require_once "Reservation.php";

class Customer
{
    public $ID;
    public $name;
    public $surname;
    public $birthdate;
    public $phone_number;
    public $email;
    public $password;
    public $is_admin;
    public $reservations = [];

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

    function __construct($ID, $name, $surname, $birthdate, $phone_number, $email, $password, $is_admin, $reservations)
    {
        $this->ID = $ID;
        $this->name = $name;
        $this->surname = $surname;
        $this->birthdate = $birthdate;
        $this->phone_number = $phone_number;
        $this->email = $email;
        $this->password = $password;
        $this->is_admin = $is_admin;
        foreach($reservations as $reservation)
        {
            $this->reservations[] = $reservation;
        }  
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
            return;
        }

        $sql = "INSERT INTO `customer` (`name`, `surname`, `birthdate`, `phone_number`, `email`, `password`, `is_admin`) 
        VALUES (?, ?, ?, ?, ?, ?, ?);";

        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "upload: Prepare failed: $conn->error";
            return;
        }

        $stmt->bind_param("ssssssi", $this->name, $this->surname, $this->birthdate, $this->phone_number, $this->email, $this->password, $this->is_admin);
        if (!$stmt->execute()) 
        {
            self::$error[] = "upload: No upload: $stmt->error";
            return;
        }
        $stmt->close();
        $conn->close();
    }

    function update($name, $surname, $birthdate, $phone_number, $email)
    {
        $server_name = "innodb.endora.cz:3306";
        $username = "houskasesalamem";
        $password = "Houskasesalamemjedobra123";
        $dbname = "kinocinematica";

        $conn = new mysqli($server_name, $username, $password, $dbname);
        if($conn->connect_error)
        {
            self::$error[] = "update: No connection: $conn->connect_error";
            return;
        }

        $sql = "UPDATE `customer`
        SET
        `name` = ? ,
        `surname` = ? ,
        `birthdate` = ? ,
        `phone_number` = ? ,
        `email` = ?
        WHERE `ID` = ? ;";

        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "update: Prepare failed: $conn->error";
            return;
        }

        $stmt->bind_param("sssssi", $name, $surname, $birthdate, $phone_number, $email, $this->ID);
        if (!$stmt->execute()) 
        {
            self::$error[] = "update: No execute: $stmt->error";
            return;
        }

        $stmt->close();
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

        $sql = "DELETE FROM `customer` WHERE `ID` = ? ;";
        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "delete: Prepare failed: $conn->error";
            return;
        }

        $stmt->bind_param("i", $this->ID);
        if (!$stmt->execute()) 
        {
            self::$error[] = "delete: No execute: $stmt->error";
            return;
        }

        $stmt->close();
        $conn->close();  
    }

    public static function download($sql = "SELECT * FROM `customer`")
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
        if (!$stmt) 
        {
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

            Reservation::download("SELECT * FROM `reservatioN` WHERE `ID-customer` = ".$row["ID"].";");
            $customer = new Customer($row["ID"], $row["name"], $row["surname"], $row["birthdate"], $row["phone_number"], $row["email"], $row["password"], $row["is_admin"], Reservation::$data[0]);
            self::$data[] = $customer;

            Reservation::$data = [];
        }

        $stmt->close();
        $conn->close();
    }
}

?>