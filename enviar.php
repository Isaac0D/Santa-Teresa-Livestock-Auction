<?php
// Set the response header to JSON
header('Content-Type: application/json');

// --- EDIT THIS LINE ---
$recipient = "alberto@magneticoh.com";
// ----------------------

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Collect and sanitize form variables
    // 'trim' removes whitespace from beginning and end
    $name = trim(htmlspecialchars($_POST["name"]));
    $email = trim(htmlspecialchars($_POST["email"]));
    $phone = trim(htmlspecialchars($_POST["phone"]));
    $message = trim(htmlspecialchars($_POST["message"]));

    // 1. Server-side validation (The most important)
    // Check that no required fields are empty
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        // If a field is missing, send a JSON error message
        echo json_encode([
            'status' => 'error',
            'message' => 'Error: All fields are required.'
        ]);
        exit; // Stop script execution
    }

    // 2. Email format validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // If the email is invalid, send a JSON error message
        echo json_encode([
            'status' => 'error',
            'message' => 'Error: The email format is invalid.'
        ]);
        exit; // Stop script execution
    }

    // 3. If everything is okay, prepare and send the email
    $subject = "New Contact Message from SANTA TERESA Website";
    
    // Build the email body
    $emailBody = "You have received a new contact message:\n\n";
    $emailBody .= "Name: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Phone: $phone\n\n";
    $emailBody .= "Message:\n$message\n";

    // Build the headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($recipient, $subject, $emailBody, $headers)) {
        // If sent successfully, send a JSON success message
        echo json_encode([
            'status' => 'success',
            'message' => 'Message sent successfully! Thank you for contacting us.'
        ]);
    } else {
        // If the 'mail' function failed (server issue)
        echo json_encode([
            'status' => 'error',
            'message' => 'There was a problem sending the message. Please try again later.'
        ]);
    }

} else {
    // If someone tries to access the script directly via browser
    echo json_encode([
        'status' => 'error',
        'message' => 'Access forbidden.'
    ]);
}
?>