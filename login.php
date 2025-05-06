<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *"); // Allow cross-origin (optional)
header("Content-Type: text/plain");

$conn = mysqli_connect("localhost", "root", "", "amfit");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (!isset($_POST['username']) || !isset($_POST['password'])) {
    die("Username or password not received.");
}

$username = trim($_POST['username']);
$password = trim($_POST['password']);

$query = "SELECT * FROM login WHERE username = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    if ($password==$row['password']) {
        echo "success";
        header('Location: home.html');
    } else {
        echo "Invalid password.";
    }
} else {
    echo "User not found.";
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
