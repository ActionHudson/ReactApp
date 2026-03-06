<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = require_once(__DIR__ . '/../private/config.php');

$allowedTables = ['users', 'products', 'orders', 'news'];

$table = $_GET['table'] ?? '';

if (!in_array($table, $allowedTables)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or restricted table name"]);
    exit;
}

try {
    $dsn = "mysql:host=" . $config['host'] . ";dbname=" . $config['name'] . ";charset=utf8mb4";
    $pdo = new PDO($dsn, $config['user'], $config['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $stmt = $pdo->prepare("SELECT * FROM `$table` LIMIT 100");
    $stmt->execute();

    echo json_encode($stmt->fetchAll());
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
}
