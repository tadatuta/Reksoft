<?php
use PHPMailer\PHPMailer\PHPMailer;

require 'php/PHPMailer.php';
require 'php/Exception.php';
require 'php/SMTP.php';

$name = $_POST['name'];
$city = $_POST['city'];
$question = $_POST['question'];
$email = $_POST['email'];

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
//Set the hostname of the mail server
$mail->Host = 'mail.reksoft.ru';
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 25;
//Whether to use SMTP authentication
$mail->SMTPAuth = false;
//Set who the message is to be sent from
$mail->setFrom('recognition@reksoft.ru', 'Recognition');
//Set who the message is to be sent to
$mail->addAddress('vnfoteyeva@gmail.com', '');
//Set the subject line
$mail->Subject = 'Recognition message';
//Replace the plain text body with one created manually
$mail->Body = "
Имя: $name
Город: $city
Вопрос: $question
Email: $email
";

$response = [];
$response["status"] = 0;

// https://github.com/google/recaptcha. Как мне вывести сообщение, чтоб заполнили капчу?
// recaptcha secret code
$secret = "6Le_dmMUAAAAAF8QO0GQ_qPsDE1Uz-Mvtw2fQdo4";
$cResponse = null;

$url = 'https://www.google.com/recaptcha/api/siteverify';
	$data = array(
		'secret' => $secret,
		'response' => $_POST["g-recaptcha-response"]
	);
	$options = array(
		'http' => array (
			'method' => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$verify = file_get_contents($url, false, $context);
	$captcha_success=json_decode($verify);

if ($cResponse != null && $captcha_success->success==true) {
    if (!$mail->send()) {
        $response["status"] = 1;
    } else {
        $response["status"] = 0;
    }
} else { // error
    $response["status"] = 1;
    $response["cResponse"] = $captcha_success->success;
    $response["capcha"]=$_POST["g-recaptcha-response"];
}

echo json_encode($response);
?>