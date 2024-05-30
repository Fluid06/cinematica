<?php 
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') {
    require_once "../includes/dbConn.inc.php";
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
        
    if ($pdo) {
        $query = "SELECT * FROM `hall`";
        $stmt = $pdo->query($query);

        $i = 0;
        $response = array();

        while ($row = $stmt->fetch()) {
            $response[$i]['ID'] = $row['ID'];    
            $i++;
        }

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(array("message" => "Something went wrong"));
    } 
} else {
    header('Location: /');
}