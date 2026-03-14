<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("127.0.0.1", "root", "", "cafe_of_heaven", 3307);
if (!$conn) { echo json_encode(['error' => mysqli_connect_error()]); exit; }

$data = json_decode(file_get_contents("php://input"), true);
$id   = (int)$data['id'];

if (!$id) { echo json_encode(['success' => false, 'error' => 'Invalid ID']); exit; }

if (mysqli_query($conn, "DELETE FROM rewards WHERE id=$id")) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>