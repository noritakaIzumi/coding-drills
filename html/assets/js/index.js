function runCode() {
    const runResult = document.getElementById('run-result');
    runResult.innerText = 'Executing...';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/call_api.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            runResult.innerText = xhr.response;
        }
    }
    xhr.send(`data=${aceEditor.session.doc.getAllLines().join('')}`);
}
