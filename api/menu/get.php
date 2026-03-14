<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("127.0.0.1", "root", "", "cafe_of_heaven", 3307);
if (!$conn) { echo json_encode(['error' => mysqli_connect_error()]); exit; }

$result = mysqli_query($conn, "SELECT * FROM menu ORDER BY added_at DESC");
$menu   = [];
while ($row = mysqli_fetch_assoc($result)) {
    $menu[] = $row;
}
echo json_encode($menu);
?>