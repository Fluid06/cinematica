<?php

include "./../includes/Movie.php";

if($_SERVER["REQUEST_METHOD"] == "POST")
{
    $name = $_POST["name"];
    $release = $_POST["release"];
    $length = $_POST["length"];
    $minimum_age = $_POST["minimumAge"];
    $director = $_POST["director"];
    $actor = $_POST["actor"];
    $genres = explode(", ", $_POST["genre"]);
    $description = $_POST["description"];

    $genress = [];
    foreach($genres as $genre)
    {
        Genre::download("SELECT * FROM `genre` WHERE `name` LIKE '".$genre."';");
        $genress[] = Genre::$data[0];
        Genre::$data = [];
    }

    $movie = new Movie(0, $name, $length, $release, $minimum_age, $director, $actor, $description, $genress);
    $movie->upload();
    
    header('Location: https://cinematica.8u.cz/admin');
}

?>