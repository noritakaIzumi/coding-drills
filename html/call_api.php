<?php

header('Content-type: text/json; charset=utf-8');
$allowOrigin = 'localhost';
header("Access-Control-Allow-Origin: ${allowOrigin}");

$domain = "language-server";
$port = "8000";

$ch = curl_init();
curl_setopt_array(
    $ch,
    array(
        CURLOPT_URL => "http://${domain}:${port}/",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 15,
    )
);
$resp = curl_exec($ch);
curl_close($ch);

echo json_encode($resp);
exit;
