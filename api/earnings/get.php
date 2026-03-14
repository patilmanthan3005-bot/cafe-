<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("127.0.0.1", "root", "", "cafe_of_heaven", 3307);
if (!$conn) { echo json_encode(['error' => mysqli_connect_error()]); exit; }

$earnings = [];
for ($i = 6; $i >= 0; $i--) {
    $date  = date('Y-m-d', strtotime("-$i days"));
    $label = date('d M',   strtotime("-$i days"));

    $result = mysqli_query($conn,
        "SELECT 
            COALESCE(SUM(total), 0) AS total,
            COUNT(*) AS order_count
         FROM orders
         WHERE DATE(placed_at) = '$date'
         AND status != 'Cancelled'"
    );
    $row = mysqli_fetch_assoc($result);
    $earnings[] = [
        'date'   => $label,
        'total'  => (float)$row['total'],
        'orders' => (int)$row['order_count']
    ];
}
echo json_encode($earnings);
?>