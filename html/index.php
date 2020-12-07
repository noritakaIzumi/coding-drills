<?php

$defaultCode = <<< EOF
print('hello world');

EOF;

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ACE in Action</title>
    <link rel="stylesheet" href="assets/css/index.css">
    <script src="assets/js/index.js"></script>
</head>
<body>
<form action="">
    <div id="problem-area" class="display-card">
        <h2>Problem</h2>
        <p>This is a problem.</p>
        <p><input type="button" onclick="runCode();" value="実行"></p>
        <h3>Result</h3>
        <p id="run-result"></p>
    </div>
    <div id="answer-area" class="display-card">
        <h2>こちらにコードを書きましょう</h2>
        <div id="editor"><?= $defaultCode ?></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ace.js" type="text/javascript"
                charset="utf-8"></script>
        <script src="assets/js/editor.js" type="text/javascript" charset="utf-8"></script>
    </div>
    <div class="after"></div>
</form>
</body>
</html>
