<?php
/**
 * Arcube Atelier — AI Room Redesign API Endpoint (cPanel / PHP)
 * Image-to-Image Room Transformation via OpenRouter (Nano Banana 2 / Gemini 3.1 Flash Image)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. Database Configuration (MySQL on cPanel)
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbName = getenv('DB_NAME') ?: 'arcube_db';
$dbUser = getenv('DB_USER') ?: 'arcube_user';
$dbPass = getenv('DB_PASS') ?: '';

// OpenRouter API Key (never exposed to frontend)
$openRouterApiKey = getenv('OPENROUTER_API_KEY') ?: '';

// 2. Connect to MySQL Database
try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    // If running in development without MySQL, log and allow demonstration flow
    error_log("Database connection error: " . $e->getMessage());
    $pdo = null;
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

// 3. Handle GET / Check attempts count
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $contact = trim($_GET['contact'] ?? '');
    $fingerprint = trim($_GET['fingerprint'] ?? '');

    $count = 0;
    if ($pdo && (!empty($contact) || !empty($fingerprint))) {
        $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM generation_attempts WHERE (contact = ? AND contact != '') OR fingerprint_hash = ?");
        $stmt->execute([$contact, $fingerprint]);
        $count = (int)$stmt->fetch()['count'];
    }

    echo json_encode([
        'success' => true,
        'attemptsCount' => $count,
        'remainingAttempts' => max(0, 2 - $count),
        'isBlocked' => $count >= 2
    ]);
    exit;
}

// 4. Handle POST / Generate Room
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        $data = $_POST;
    }

    $name = trim($data['name'] ?? '');
    $contact = trim($data['contact'] ?? '');
    $fingerprint = trim($data['fingerprint'] ?? '');
    $roomType = trim($data['room_type'] ?? 'Living room');
    $style = trim($data['style'] ?? 'Minimalist');
    $extraNote = trim($data['extra_note'] ?? '');
    $imageData = $data['image'] ?? ''; // Base64 data URL

    // 4.1 Check Attempts Limit (Capped at 2 per visitor)
    if ($pdo && (!empty($contact) || !empty($fingerprint))) {
        $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM generation_attempts WHERE (contact = ? AND contact != '') OR fingerprint_hash = ?");
        $stmt->execute([$contact, $fingerprint]);
        $attemptsCount = (int)$stmt->fetch()['count'];

        if ($attemptsCount >= 2) {
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'blocked' => true,
                'attemptsCount' => $attemptsCount,
                'message' => 'You have used your 2 free redesign attempts. Compare your designs or book a consultation.'
            ]);
            exit;
        }
    }

    if (empty($imageData)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Please upload a photo of your room.']);
        exit;
    }

    // 4.2 Assemble Strict Backend Prompt Template
    $noteAppend = !empty($extraNote) ? " Additional note: " . htmlspecialchars($extraNote) . "." : "";
    $prompt = "Redesign this {$roomType} in a {$style} style. Keep the room's architecture, camera angle, and perspective identical. Do not add people, text, logos, or unrelated objects.{$noteAppend}";

    // 4.3 Dispatch to OpenRouter with 1 Auto-Retry
    $generatedImageUrl = null;
    $attemptsMade = 0;
    $maxTries = 2; // 1 attempt + 1 auto-retry on failure

    while ($attemptsMade < $maxTries && !$generatedImageUrl) {
        $attemptsMade++;
        if (!empty($openRouterApiKey)) {
            $generatedImageUrl = callOpenRouterImageToImage($openRouterApiKey, $imageData, $prompt);
        } else {
            // Local fallback simulation when API key is pending
            $generatedImageUrl = "/images/after-luxury.jpg";
            break;
        }
    }

    if (!$generatedImageUrl) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Generation failed after retry. This attempt was not counted against your limit.'
        ]);
        exit;
    }

    // 4.4 Save Attempt to Database (Only on successful generation)
    if ($pdo) {
        try {
            $insert = $pdo->prepare("INSERT INTO generation_attempts (name, contact, ip_address, fingerprint_hash, room_type, style, extra_note, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $insert->execute([$name, $contact, $clientIp, $fingerprint, $roomType, $style, $extraNote, $generatedImageUrl]);
        } catch (Exception $e) {
            error_log("Failed to log generation attempt: " . $e->getMessage());
        }
    }

    // Return result with remaining count
    echo json_encode([
        'success' => true,
        'image' => $generatedImageUrl,
        'roomType' => $roomType,
        'style' => $style,
        'promptUsed' => $prompt
    ]);
    exit;
}

/**
 * OpenRouter Image-to-Image Client
 */
function callOpenRouterImageToImage($apiKey, $base64Image, $prompt) {
    $url = "https://openrouter.ai/api/v1/chat/completions";

    // Clean data URL prefix if present
    $cleanBase64 = preg_replace('#^data:image/\w+;base64,#i', '', $base64Image);

    $payload = [
        "model" => "google/gemini-2.0-flash-exp:free", // Or google/gemini-flash-1.5 / Nano Banana 2
        "messages" => [
            [
                "role" => "user",
                "content" => [
                    [
                        "type" => "text",
                        "text" => $prompt
                    ],
                    [
                        "type" => "image_url",
                        "image_url" => [
                            "url" => "data:image/jpeg;base64," . $cleanBase64
                        ]
                    ]
                ]
            ]
        ]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer " . $apiKey,
        "Content-Type: application/json",
        "HTTP-Referer: https://arcube.lk",
        "X-Title: Arcube AI Studio"
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $json = json_decode($response, true);
        $content = $json['choices'][0]['message']['content'] ?? null;
        // If the model returned an image URL or markdown image
        if ($content && preg_match('#https?://[^\s)]+\.(jpg|jpeg|png|webp)#i', $content, $matches)) {
            return $matches[0];
        }
    }

    return null;
}

