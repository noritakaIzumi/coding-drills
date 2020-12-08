<?php

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod !== "POST") {
    echo 'Request method is wrong.';
    exit;
}

if (count($_POST) !== 1 || !isset($_POST['code'])) {
    echo 'Invalid data is included.';
    exit;
}

$filename = '/var/www/html/code.py';
file_put_contents($filename, $_POST['code']);
exit;
