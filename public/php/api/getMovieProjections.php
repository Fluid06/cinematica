<?php

require_once "./../includes/Projection.php";
require_once "Movie.php";

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

ini_set('display_errors', 1);

if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{

    function getData($days)
    {
        $day = ["2D" => [], "3D" => []];

        Movie::download("SELECT DISTINCT m.*
        FROM `movie` `m` INNER JOIN `projection` `p` ON `m`.`ID` = `p`.`ID-movie`
        WHERE DATE(`p`.`start_time`) = DATE_ADD(CURDATE(), INTERVAL ".$days." DAY);");

        foreach(Movie::$data as $movie)
        {
            $movieData2D = [
                "movie_info" => $movie,
                "projections" => []
            ];

            $movieData3D = [
                "movie_info" => $movie,
                "projections" => []
            ];


            Projection::download("SELECT *
            FROM `projection` 
            WHERE `ID-movie` = ".$movie->ID." AND DATE(`start_time`) = DATE_ADD(CURDATE(), INTERVAL ".$days." DAY);");

            foreach(Projection::$data as $projection)
            {
                if($projection->is_3D == 0)
                {
                    $movieData2D["projections"][] = $projection;
                }
                else
                {
                    $movieData3D["projections"][] = $projection; 
                }
            }

            if(!empty($movieData2D["projections"]))
            {
                $day["2D"][] = $movieData2D;
            }
            if(!empty($movieData3D["projections"]))
            {
                $day["3D"][] = $movieData3D;
            }

            Projection::$data = [];
        }

        return $day;
    }

    $today = getData(0);
    $tommorow = getData(1);
    $doubleTommorow = getData(2);
    $response;

    if(!empty(Movie::$error) || !empty(Projection::$error))
    {
        $response = ["success" => false, Movie::$error, Projection::$error];
    }
    else
    {
        $response = ["success" => true, $today, $tommorow, $doubleTommorow];
    }

    echo json_encode($response, JSON_OBJECT_AS_ARRAY);
}

else 
{
    header('Location: /');
}
?>
