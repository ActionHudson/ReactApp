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

if (!$input || !isset($input['table']) || !isset($input['data']) || !is_array($input['data'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request format"]);
    exit;
}

$allowedTables = ['plants', 'recipes', 'references'];
$table = $input['table'];

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

    $data = $input['data'];
    $columns = array_keys($data);

    $columnString = implode("`, `", $columns);
    $placeholderString = implode(", ", array_fill(0, count($columns), "?"));

    $sql = "INSERT INTO `$table` (`$columnString`) VALUES ($placeholderString)";
    $stmt = $pdo->prepare($sql);

    $values = [];
    foreach ($columns as $column) {
        $val = $data[$column];
        if (is_array($val)) {
            $values[] = json_encode($val);
        } else {
            $values[] = $val === "" ? null : $val;
        }
    }

    $stmt->execute($values);

    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}


// const payload = {
//     table: 'plants',
//     data: {
//         name: 'Butternut Squash',
//         brand: 'Herbal Age',
//         breed: 'Hunter',
//         plant_depth_mm: 25,
//         sowing_info: 'Sow in pots under cover.',
//         schedule: {
//             apr: "SAH",
//             may: "SAH",
//             jun: "SO",
//             sep: "HAR",
//             oct: "HAR"
//         }
//     }
// };

// const res = await fetch('/aether/insert.php', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(payload)
// });

// const result = await res.json();
// console.log(result);
