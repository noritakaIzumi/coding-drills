<?php

$drill = '<b>Hello World</b> と出力してみましょう。';
$defaultCode = file_get_contents('/var/www/html/code.py');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Coding Drills</title>
    <link rel="stylesheet" href="assets/css/index.css">
    <script src="assets/js/index.js"></script>
</head>
<body>
<h1>Coding Drills</h1>
<div id="problem-area" class="display-card">
    <h2>Drill</h2>
    <p><?= $drill ?></p>
    <p>
        <input type="button" onclick="runCode();" value="実行 (Ctrl + Enter)" id="button-run">
        <input type="button" onclick="saveFile();" value="保存 (Ctrl + S)" id="button-save">
    </p>
    <h2>Result</h2>
    <h3>Stdout</h3>
    <div id="run-result-stdout" class="run-result-area"></div>
    <h3>Stderr</h3>
    <details id="run-result-stderr-details">
        <div id="run-result-stderr" class="run-result-area"></div>
    </details>
    <div id="problem-area-bottom"></div>
</div>
<script src="assets/js/problem-area.js" type="text/javascript" charset="utf-8"></script>
<div id="coding-area" class="display-card">
    <h2>こちらにコードを書きましょう</h2>
    <div id="editor"><?= $defaultCode ?></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ace.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="assets/js/answer-area.js" type="text/javascript" charset="utf-8"></script>
</div>
<div class="after"></div>
<script src="http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js" type="text/javascript"
        charset="utf-8"></script>
<script src="assets/js/add-shortcut.js" type="text/javascript" charset="utf-8"></script>
<p id="alert-area"></p>
</body>
</html>
