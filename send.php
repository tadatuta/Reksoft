<?php
use PHPMailer\PHPMailer\PHPMailer;

require 'php/PHPMailer.php';
require 'php/Exception.php';
require 'php/SMTP.php';

$name = $_POST['name'];
$city = $_POST['city'];
$question = $_POST['question'];
$email = $_POST['email'];

echo "$name;$city;$question;$email";
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
$mail->addAddress('vmityakova@reksoft.ru', '');
//Set the subject line
$mail->Subject = 'Recognition message';
//Replace the plain text body with one created manually
$mail->Body = 'This is a plain-text message body';

//if (!$mail->send()) {
//    echo 'Mailer Error: ' . $mail->ErrorInfo;
//} else {
//    echo 'Message sent!';
//}
?>