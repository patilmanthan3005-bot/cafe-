<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("127.0.0.1", "root", "", "cafe_of_heaven", 3307);
if (!$conn) { echo json_encode(['error' => mysqli_connect_error()]); exit; }

$data      = json_decode(file_get_contents("php://input"), true);
$id        = (int)$data['id'];
$name      = mysqli_real_escape_string($conn, $data['name']);
$price     = (float)$data['price'];
$category  = mysqli_real_escape_string($conn, $data['category']);
$emoji     = mysqli_real_escape_string($conn, $data['emoji']);
$available = (int)$data['available'];

if (!$id) { echo json_encode(['success' => false, 'error' => 'Invalid ID']); exit; }

$sql = "UPDATE menu SET 
        name='$name', price='$price', category='$category', 
        emoji='$emoji', available='$available'
        WHERE id=$id";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>