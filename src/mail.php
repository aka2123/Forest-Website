<?php

$name = $_POST["name"];
$from = $_POST["email"];
$subject = "Wiadomość z formularza ze strony Forest";
$to = "adres@email.com";
$message = $_POST["msg"];


$txt = "Imię: " . $name . "\r\n" . "Email: " . $from . "\r\n" . "\r\n" . "Treść: " . $message;

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";
$headers .= "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $from . "\r\n";

$mail_status = mail($to, $subject, $txt, $headers);

if ($mail_status) {
    header("Location: /contact.html?mail_status=sent"); // jeśli formularz jest na stronie głównej, zmień na index.html
} else {
    header("Location: /contact.html?mail_status=error"); // jeśli formularz jest na stronie głównej, zmień na index.html
}