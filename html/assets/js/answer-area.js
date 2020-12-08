const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/python");
editor.setOptions({
    fontSize: '12pt',
})
let editorElement = document.getElementById('editor');
let card = document.getElementsByClassName('display-card')[1];
card.style.height = `${window.innerHeight - editorElement.offsetTop - card.offsetTop}px`;
editorElement.style.height = `${card.clientHeight}px`;
editorElement.style.width = `${card.clientWidth - 10}px`;
