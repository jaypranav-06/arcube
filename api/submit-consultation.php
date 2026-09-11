<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbName = getenv('DB_NAME') ?: 'arcube_db';
$dbUser = getenv('DB_USER') ?: 'arcube_user';
$dbPass = getenv('DB_PASS') ?: '';

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    error_log("DB connection error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database unavailable']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: [];

$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$phone    = trim($data['phone'] ?? '');
$typology = trim($data['typology'] ?? '');
$location = trim($data['location'] ?? '');
$sqft     = trim($data['sqft'] ?? '');
$budget   = trim($data['budget'] ?? '');
$timeline = trim($data['timeline'] ?? '');
$elements = $data['elements'] ?? [];
$atelier  = trim($data['atelier'] ?? '');
$notes    = trim($data['notes'] ?? '');
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and phone are required']);
    exit;
}

$elementsList = !empty($elements) ? implode(', ', $elements) : 'None selected';
$message = "[Consultation Enquiry]\n"
    . "Property: $typology\n"
    . "Location: $location\n"
    . "Size: $sqft\n"
    . "Budget: $budget\n"
    . "Timeline: $timeline\n"
    . "Elements: $elementsList\n"
    . "Meeting: $atelier\n"
    . "Notes: $notes";

try {
    $stmt = $pdo->prepare("INSERT INTO redesign_leads (name, phone, email, message, ip_address) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$name, $phone, $email, $message, $clientIp]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    error_log("Failed to save consultation: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save enquiry']);
}
