<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$config = require(__DIR__ . '/../config.php');
$allowedTables = ['plants', 'recipes', 'references'];

try {
    $dsn = "mysql:host={$config['host']};dbname={$config['database']};charset=utf8mb4";
    $pdo = new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $method = $_SERVER['REQUEST_METHOD'];
    $input = json_decode(file_get_contents("php://input"), true);
    $table = $_GET['table'] ?? $input['table'] ?? '';

    if (!in_array($table, $allowedTables)) {
        throw new Exception("Access denied: Table not in allowed list.");
    }

    if ($method === 'GET') {
        $id = $_GET['id'] ?? null;

        $stmt = $pdo->prepare("DESCRIBE `$table`");
        $stmt->execute();
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        $schema = array_fill_keys($columns, '');

        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM `$table` WHERE id = ?");
            $stmt->execute([$id]);
            $data = $stmt->fetch();
            echo json_encode($data ?: ["error" => "Record not found"]);
        } else {
            echo json_encode($schema);
        }
    }

    if ($method === 'POST') {
        $data = $input['data'];
        $id = $data['id'] ?? null;

        if ($id && $id !== '') {
            unset($data['id']);
            $setSegments = [];
            $values = [];
            foreach ($data as $column => $val) {
                $setSegments[] = "`$column` = ?";
                $values[] = is_array($val) ? json_encode($val) : ($val === "" ? null : $val);
            }
            $values[] = $id;
            $sql = "UPDATE `$table` SET " . implode(", ", $setSegments) . " WHERE `id` = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
            echo json_encode(["success" => true, "affected_rows" => $stmt->rowCount()]);
        } else {
            $columns = array_keys($data);
            $colString = implode("`, `", $columns);
            $placeholders = implode(", ", array_fill(0, count($columns), "?"));
            $values = array_map(fn($v) => is_array($v) ? json_encode($v) : ($v === "" ? null : $v), array_values($data));

            $sql = "INSERT INTO `$table` (`$colString`) VALUES ($placeholders)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
            echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
