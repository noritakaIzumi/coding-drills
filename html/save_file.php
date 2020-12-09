<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit;
}

$allowOrigin = 'localhost';
header("Access-Control-Allow-Origin: ${allowOrigin}");

$filename = '/var/www/html/code.py';
file_put_contents($filename, $_POST['code']);
exit;
