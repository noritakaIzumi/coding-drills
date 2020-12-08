<?php

header('Content-type: text/json; charset=utf-8');
$allowOrigin = 'localhost';
header("Access-Control-Allow-Origin: ${allowOrigin}");

$domain = "language-server";
$port = "8000";

$filename = '/var/www/html/code.py';

$ch = curl_init();
curl_setopt_array(
    $ch,
    array(
        CURLOPT_URL => "http://${domain}:${port}/python",
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => array('file' => new CURLFile($filename)),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 10,
    )
);
$resp = curl_exec($ch);
curl_close($ch);

echo $resp;
exit;
