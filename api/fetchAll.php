<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$configPath = __DIR__ . '/../config.php';

if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode([
        "error" => "Config file not found",
        "attempted_path" => $configPath,
        "current_dir" => __DIR__
    ]);
    exit;
}

$config = require_once($configPath);

$allowedTables = ['recipes', 'products', 'orders', 'news'];
$table = $_GET['table'] ?? '';

if (!in_array($table, $allowedTables)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid table name: " . $table]);
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

    $results = $stmt->fetchAll();
    echo json_encode($results);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Database connection failed",
        "debug" => $e->getMessage()
    ]);
}
