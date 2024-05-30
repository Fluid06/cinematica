<?php

include "Genre.php";
include "Image.php";

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
            exit();
        }

        $sql = "INSERT INTO `movie` (`name`, `length`, `release_date`, `minimum_age`, `director_name`, `main_actor_name`, `description`) 
        VALUES (?, ?, ?, ?, ?, ?, ?);";

        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "upload: Prepare failed: $conn->error";
            exit();
        }

        $stmt->bind_param("sisisss", $this->name, $this->length, $this->release_date, $this->minimum_age, $this->director_name, $this->main_actor_name, $this->description);
        if (!$stmt->execute()) 
        {
            self::$error[] = "upload: No upload: $stmt->error";
            exit();
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
                exit();
            }
    
            $stmt->bind_param("ii", $movie_ID, $genre->ID);
            if (!$stmt->execute()) 
            {
                self::$error[] = "upload: No upload: $stmt->error";
                exit();
            }
        }

        Image::upload($movie_ID, $this->name);

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
