<?php 
if ($_GET['key'] == 'SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==') 
{
    require_once "../includes/dbConn.inc.php";
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
        
    if ($pdo) {
        $query = "SELECT * FROM customer";
        $stmt = $pdo->query($query);

        $i = 0;
        $response = array();

        while ($row = $stmt->fetch()) {
            $response[$i]['ID'] = $row['ID'];    
            $response[$i]['name'] = $row['name']; 
            $response[$i]['surname'] = $row['surname']; 
            $response[$i]['birthdate'] = $row['birthdate']; 
            $response[$i]['phone_number'] = $row['phone_number']; 
            $response[$i]['email'] = $row['email']; 
            $response[$i]['password'] = $row['password'];
            $i++;
        }

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(array("message" => "Something went wrong"));
    } 
} 
else 
{
    header('Location: /');
}