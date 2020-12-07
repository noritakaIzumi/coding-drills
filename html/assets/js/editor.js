const aceEditor = ace.edit("editor");
aceEditor.setTheme("ace/theme/monokai");
aceEditor.session.setMode("ace/mode/python");
aceEditor.setOptions({
    fontSize: '12pt',
})
let editor = document.getElementById('editor');
let card = document.getElementsByClassName('display-card')[1];
card.style.height = `${window.innerHeight - editor.offsetTop - card.offsetTop}px`;
editor.style.height = `${card.clientHeight}px`;
editor.style.width = `${card.clientWidth - 10}px`;
