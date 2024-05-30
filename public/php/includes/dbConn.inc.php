<?php 
require_once "core.php";

$dbname = "mysql:host=innodb.endora.cz:3306;dbname=kinocinematica";
$dbuser = "dapanipaelpa";
$dbpwd = "Houskasesalamemjedobra123";

try {
    $pdo = new PDO($dbname, $dbuser, $dbpwd);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}