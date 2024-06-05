<?php

require_once "Genre.php";
require_once "Image.php";
require_once "Projection.php";

class Movie
{
    public $ID;
    public $name;
    public $director_name;
    public $main_actor_name;
    public $release_date;
    public $length;
    public $minimum_age;
    public $description;
    public $genres = [];
    public $images = [];

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

    function __construct($ID ,$name, $length, $release_date, $minimum_age, $director_name=null, $main_actor_name=null, $description=null, $genres=null, $images=null)
    {
        $this->ID=$ID;
        $this->name=$name;
        $this->release_date=$release_date;
        $this->length=$length;
        $this->minimum_age=$minimum_age;
        $this->director_name=$director_name;
        $this->main_actor_name=$main_actor_name;
        $this->description=$description;

        foreach($genres as $genre)
        {
            $this->genres[] = $genre;
        }

        foreach($images as $image)
        {
            $this->images[] = $image;
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

        $sql = "INSERT INTO `movie` (`name`, `length`, `release_date`, `minimum_age`, `director_name`, `main_actor_name`, `description`) 
        VALUES (?, ?, ?, ?, ?, ?, ?);";

        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "upload: Prepare failed: $conn->error";
            return;
        }

        $stmt->bind_param("sisisss", $this->name, $this->length, $this->release_date, $this->minimum_age, $this->director_name, $this->main_actor_name, $this->description);
        if (!$stmt->execute()) 
        {
            self::$error[] = "upload: No upload: $stmt->error";
            return;
        }
        $movie_ID = $conn->insert_id;
        $stmt->close();

        $sql = "INSERT INTO `movie_genre`
        VALUES(?, ?);";

        foreach($this->genres as $genre)
        {
            $stmt = $conn->prepare($sql);
            if (!$stmt) 
            {
                self::$error[] = "upload: Prepare failed: $conn->error";
                return;
            }
    
            $stmt->bind_param("ii", $movie_ID, $genre->ID);
            if (!$stmt->execute()) 
            {
                self::$error[] = "upload: No upload: $stmt->error";
                return;
            }
        }

        Image::upload($movie_ID, $this->name);

        $conn->close();
    }

    function update($name, $release_date, $length, $minimum_age, $director, $actor, $description)
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

        $sql = "UPDATE `movie`
        SET
        `name` = ?,
        `release_date` = ?,
        `length` = ?,
        `minimum_age` = ?,
        `director_name` = ?,
        `main_actor_name` = ?,
        `description` = ?
        WHERE `ID` = ?;";

        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "update: Prepare failed: $conn->error";
            return;
        }

        $stmt->bind_param("ssiisssi", $name, $release_date, $length, $minimum_age, $director, $actor, $description, $this->ID);
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

        foreach($this->images as $image)
        {
            $image->delete();
        }
        Projection::download("SELECT * FROM `projection` WHERE `ID-movie` = ".$this->ID.";");
        foreach(Projection::$data as $projection)
        {
            $projection->delete();
        }
        $sql = "DELETE FROM `movie_genre` WHERE `ID-movie` = ?;";
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

        $sql = "DELETE FROM `movie` WHERE `ID` = ?;";
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

    public static function download($sql = "SELECT * FROM `movie`")
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
            Genre::download("SELECT * 
            FROM `genre`
            WHERE `ID` IN
            (
                SELECT `ID-genre`
                FROM `movie_genre`
                WHERE `ID-movie` =".$row["ID"]."
            );");

            Image::download("SELECT * 
            FROM `image`
            WHERE `ID-movie` = ".$row["ID"].";");

            $movie = new Movie($row["ID"], $row["name"], $row["length"], $row["release_date"], $row["minimum_age"], $row["director_name"], $row["main_actor_name"], $row["description"], Genre::$data, Image::$data);
            self::$data[] = $movie;
            Genre::$data = [];
            Image::$data = [];
        }

        $stmt->close();
        $conn->close();
    }
}
?>
