<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$config = require(__DIR__ . '/../config.php');
$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input['table']) || !isset($input['id']) || ($input['id'] === '' && $input['id'] !== 0)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing table or id"]);
    exit;
}

$allowedTables = ['plants', 'recipes', 'references'];
$table = $input['table'];
$id = $input['id'];

if (!in_array($table, $allowedTables)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid table"]);
    exit;
}

try {
    $dsn = "mysql:host={$config['host']};dbname={$config['database']};charset=utf8mb4";
    $pdo = new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $setSegments = [];
    $values = [];

    foreach ($input as $column => $val) {
        if ($column === 'table' || $column === 'id') {
            continue;
        }

        $setSegments[] = "`$column` = ?";

        if (is_array($val)) {
            $values[] = json_encode($val);
        } else {
            $values[] = $val === "" ? null : $val;
        }
    }

    if (empty($setSegments)) {
        echo json_encode(["success" => true, "message" => "No fields to update"]);
        exit;
    }

    $values[] = $id;
    $setString = implode(", ", $setSegments);
    $sql = "UPDATE `$table` SET $setString WHERE `id` = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($values);

    echo json_encode([
        "success" => true,
        "affected_rows" => $stmt->rowCount()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
