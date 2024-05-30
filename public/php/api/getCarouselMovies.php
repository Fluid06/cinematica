<?php 
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') {
    require_once "../includes/dbConn.inc.php";
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
        
    if ($pdo) {
        $query = "SELECT * FROM `movie` ORDER BY `release_date` DESC LIMIT 5;";
        $stmt1 = $pdo->query($query);

        $i = 0;
        $response = array();

        while ($row = $stmt1->fetch()) {
            $genres = array();
            $img = array();

            $response[$i]['ID'] = $row['ID'];
            $response[$i]['name'] = $row['name'];
            $response[$i]['release_date'] = $row['release_date'];
            $response[$i]['length'] = $row['length'];
            $response[$i]['minimum_age'] = $row['minimum_age'];
            $response[$i]['director_name'] = $row['director_name'];
            $response[$i]['main_actor_name'] = $row['main_actor_name'];
            $response[$i]['description'] = $row['description'];

            $query = "SELECT g.`name` FROM `movie_genre` m INNER JOIN `genre` g ON m.`ID-genre` = g.`ID` WHERE m.`ID-movie` = " . $row['ID'] . ";";
            $stmt2 = $pdo->query($query);

            while ($genre = $stmt2->fetch()) {
                array_push($genres, $genre['name']);
            }

            $response[$i]['genres'] = $genres;

            $query = "SELECT `path` FROM `image` WHERE `ID-movie` = " . $row['ID'] . ";";
            $stmt3 = $pdo->query($query);

            while ($image = $stmt3->fetchColumn()) {
                array_push($img, $image);
            }

            $response[$i]['images']["banner"] = $img[0];
            $response[$i]['images']["poster"] = $img[1];

            $i++;
        }

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(array("message" => "Something went wrong"));
    } 
} else {
    header('Location: /');
}

if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    Movie::download("SELECT * FROM `movie` ORDER BY `release_date` DESC LIMIT 5;");

    if (!empty(Movie::$error)) 
    {
        $response = Movie::$error;
    }
    else 
    {    
        $response = Movie::$data;
    }

    echo json_encode($response, JSON_OBJECT_AS_ARRAY); 
} 
else 
{
    header('Location: /');
}