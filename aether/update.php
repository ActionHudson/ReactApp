<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$config = require(__DIR__ . '/../config.php');
$rawInput = json_decode(file_get_contents("php://input"), true);

if (!$rawInput) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request format"]);
    exit;
}

$isMulti = isset($rawInput[0]) && is_array($rawInput[0]);
$items = $isMulti ? $rawInput : [$rawInput];
$allowedTables = ['plants', 'recipes', 'references'];
$affectedRows = 0;

try {
    $dsn = "mysql:host={$config['host']};dbname={$config['database']};charset=utf8mb4";
    $pdo = new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $pdo->beginTransaction();

    foreach ($items as $input) {
        if (!isset($input['table']) || !isset($input['id']) || ($input['id'] === '' && $input['id'] !== 0)) {
            throw new Exception("Missing table or id in payload");
        }

        $table = $input['table'];
        $id = $input['id'];

        if (!in_array($table, $allowedTables)) {
            throw new Exception("Invalid table: " . $table);
        }

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

        if (!empty($setSegments)) {
            $values[] = $id;
            $setString = implode(", ", $setSegments);
            $sql = "UPDATE `$table` SET $setString WHERE `id` = ?";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
            $affectedRows += $stmt->rowCount();
        }
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "affected_rows" => $affectedRows
    ]);
} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
