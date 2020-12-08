const ConsoleMessages = {
    'executing': 'Executing...',
    'pleaseWait': (x) => `しばらくお待ちください（${x} 秒後に再実行します）`,
    'waitAWhileAndRetry': '時間をおいてから再度お試しください',
};
const AlertMessages = {
    'saved': '保存しました！',
    'errorOccurred': '何らかのエラーが発生しました',
};

let rc = 0;
let timeoutId = 0;

function notify(message) {
    const alertArea = document.getElementById('alert-area')
    alertArea.innerText = message;
    alertArea.style.display = 'block';
    setTimeout(() => {
        alertArea.style.display = 'none';
        alertArea.innerText = '';
    }, 3000);
}

function runCode() {
    const runResultStdout = document.getElementById('run-result-stdout');
    const runResultStderr = document.getElementById('run-result-stderr');
    runResultStdout.innerText = ConsoleMessages.executing;
    runResultStderr.innerText = '';

    clearTimeout(timeoutId);
    document.getElementById('button-run').disabled = true;
    saveFile(false);

    const retryProcess = () => {
        const retryTimeout = (n) => 2000 * Math.pow(2, n);
        const retryCountdown = (n) => {
            return () => {
                runResultStdout.innerText = ConsoleMessages.pleaseWait(n);
                runResultStderr.innerText = '';
                if (n > 1) {
                    setTimeout(retryCountdown(n - 1), 1000);
                }
            }
        }
        retryCountdown(retryTimeout(rc) / 1000)();
        if (rc < 3) {
            setTimeout(runCode, retryTimeout(rc++));
        } else {
            runResultStdout.innerText = ConsoleMessages.waitAWhileAndRetry;
            runResultStderr.innerText = '';
        }
    };

    const endProcess = () => {
        document.getElementById('run-result-stderr-details').open = !!stderr;
        document.getElementById('button-run').disabled = false;
        rc = 0;
        clearTimeout(timeoutId);
    };

    const xhr = new XMLHttpRequest();
    let stdout = '';
    let stderr = '';
    xhr.open('POST', '/call_api.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            switch (this.status) {
                case 200:
                    if (typeof xhr.response['stdout'] === 'undefined'
                        || typeof xhr.response['stderr'] === 'undefined') {
                        retryProcess();
                        break;
                    }
                    stdout = xhr.response['stdout'];
                    stderr = xhr.response['stderr'];
                    runResultStdout.innerText = stdout;
                    runResultStderr.innerText = stderr;
                    endProcess();
                    break;
                case 422: // Unprocessable Entity
                    retryProcess();
                    break;
                default:
                    notify(AlertMessages.errorOccurred);
                    endProcess();
            }
        }
    }
    xhr.send(`code=${encodeURIComponent(editor.getValue())}`);
    const monitorReadyState = (readyState) => {
        return () => {
            if (xhr.readyState === readyState) {
                runResultStdout.innerText = ConsoleMessages.waitAWhileAndRetry;
                runResultStderr.innerText = '';
                endProcess();
            }
        };
    };
    timeoutId = setTimeout(monitorReadyState(xhr.readyState), 10000);
}

function saveFile(displayAlert = true) {
    document.getElementById('button-save').disabled = true;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/save_file.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.responseType = 'text';
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200 && displayAlert) {
            notify(AlertMessages.saved);
        }
        document.getElementById('button-save').disabled = false;
    }
    xhr.send(`code=${encodeURIComponent(editor.getValue())}`);
}
