<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize inputs
    $username = htmlspecialchars($_POST['username']);
    $contact = htmlspecialchars($_POST['contact']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(array("success" => false, "message" => "Invalid email format"));
        exit();
    }

    // Hash the password securely
    // $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Database connection details
    $conn = new mysqli("localhost", "root", "", "amfit");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the contact number already exists
    $stmt_check = $conn->prepare("SELECT * FROM login WHERE contact = ?");
    $stmt_check->bind_param("s", $contact);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();
    
    if ($result_check->num_rows > 0) {
        echo json_encode(array("success" => false, "message" => "Contact number already in use"));
        exit(); // Stop execution if contact is already registered
    }

    // Insert user data into the database
    $stmt = $conn->prepare("INSERT INTO login (username, contact, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $contact, $email, $password);

    // Execute and check if insertion is successful
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Signup successful"));
        header('Location: home.html');
        exit(); // Redirect to home page after successful signup
    } else {
        echo json_encode(array("success" => false, "message" => "Error: " . $stmt->error));
    }

    // Close statements and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
?>
