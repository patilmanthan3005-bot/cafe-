<?php
require '../db.php';

$data  = json_decode(file_get_contents("php://input"), true);

$label = mysqli_real_escape_string($conn, $data['label']);
$type  = mysqli_real_escape_string($conn, $data['type']);
$value = mysqli_real_escape_string($conn, $data['value']);
$emoji = mysqli_real_escape_string($conn, $data['emoji']);

$sql = "INSERT INTO rewards (label, type, value, emoji, active)
        VALUES ('$label', '$type', '$value', '$emoji', 1)";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        'success' => true,
        'id'      => mysqli_insert_id($conn)
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error'   => mysqli_error($conn)
    ]);
}
?>