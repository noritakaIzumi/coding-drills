<?php

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo 'Request method is wrong.';
    exit;
}
if (count($_POST) !== 1 || !isset($_POST['code'])) {
    echo 'Invalid data is included.';
    exit;
}

$allowOrigin = 'localhost';
header("Access-Control-Allow-Origin: ${allowOrigin}");

$filename = '/var/www/html/code.py';
file_put_contents($filename, $_POST['code']);
exit;
