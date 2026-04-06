<?php
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$config = require(__DIR__ . '/../config.php');

try {
    $dsn = "mysql:host={$config['host']};dbname={$config['database']};charset=utf8mb4";
    $pdo = new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    if (isset($_COOKIE['auth_token'])) {
        $token = $_COOKIE['auth_token'];

        $stmt = $pdo->prepare("SELECT id, role FROM users WHERE auth_token = ?");
        $stmt->execute([$token]);
        $user = $stmt->fetch();

        if ($user) {
            echo json_encode([
                "authenticated" => true,
                "role" => $user['role']
            ]);
            exit;
        }
    }

    http_response_code(401);
    echo json_encode(["authenticated" => false]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
