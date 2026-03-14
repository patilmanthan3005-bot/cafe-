<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require '../../db.php';

$result  = mysqli_query($conn, "SELECT * FROM rewards ORDER BY id DESC");
$rewards = [];

while ($row = mysqli_fetch_assoc($result)) {
    $rewards[] = $row;
}

echo json_encode($rewards);
?>