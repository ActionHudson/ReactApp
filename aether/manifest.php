<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = require(__DIR__ . '/../config.php');

if (!is_array($config)) {
    http_response_code(500);
    echo json_encode(["error" => "Configuration structure is invalid"]);
    exit;
}

$allowedTables = ['recipes', 'references', 'plants'];
$table = $_GET['table'] ?? '';

if (!in_array($table, $allowedTables)) {
    http_response_code(400);
    echo json_encode(["error" => "Access denied or table does not exist"]);
    exit;
}

try {
    $host = $config['host'] ?? '';
    $db   = $config['database'] ?? '';
    $user = $config['username'] ?? '';
    $pass = $config['password'] ?? '';

    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $pdo = new PDO($dsn, $user, $pass, $options);

    $stmt = $pdo->prepare("SELECT * FROM `$table`");
    $stmt->execute();

    echo json_encode($stmt->fetchAll());
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Server connection error"]);
}
