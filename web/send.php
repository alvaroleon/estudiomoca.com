<?php
ini_set('display_errors', false);

$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
$subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
$error = "";
$errorMessage = 'En estos momentos no podemos enviar tu mensaje, por favor, intentalo más tarde.';

//Validate first
if (empty($name) || empty($email) || empty($message)) {
    echo "Debes ingresar tu nombre, email y mensaje.";
    header('Location: /');
}
//validate against any email injection attempts
if (IsInjected($email)) {
    echo "Debe";
    header('Location: /');
}

$msg = "Name : $name\r\n";
$msg .= "Email: $email\r\n";
$msg .= "Subject: $subject\r\n";
$msg .= "Message : " . stripslashes($_POST['message']) . "\r\n\n";
$msg .= "User information \r\n";
$msg .= "User IP : " . $_SERVER["REMOTE_ADDR"] . "\r\n";
$msg .= "Browser info : " . $_SERVER["HTTP_USER_AGENT"] . "\r\n";
$msg .= "User come from : " . $_SERVER["SERVER_NAME"] . "\r\n";
//$msg .= "Template Name : NEXT - MINIMAL MULTIPURPOSE HTML TEMPLATE";

$recipient = "hola@estudiomoca.com";// Change the recipient email adress to your adrees
$sujet = "Contacto Estudio Moca";
$mailheaders = "From: $email\r\nReply-To: $email\r\nReturn-Path: $email\r\n";

if (!$error) {
    $sending = mail($recipient, $sujet, $msg, $mailheaders);

    if ($sending) {
        header('Content-Type: application/json');

        echo json_encode([
            'Hemos recibido tu mensaje, nos contactaremos pronto.'
        ]);
    } else {
        http_response_code(400);
        echo json_encode([['type' => 'error'],['msg' =>$errorMessage]]);
    }
} else {
    http_response_code(400);
    echo json_encode([['type' => 'error'],['msg' =>$error]]);
}

// Function to validate against any email injection attempts
function IsInjected($str)
{
    $injections = array('(\n+)',
        '(\r+)',
        '(\t+)',
        '(%0A+)',
        '(%0D+)',
        '(%08+)',
        '(%09+)'
    );
    $inject = join('|', $injections);
    $inject = "/$inject/i";
    if (preg_match($inject, $str)) {
        return true;
    } else {
        return false;
    }
}