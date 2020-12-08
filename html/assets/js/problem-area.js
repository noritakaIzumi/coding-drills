const offset = document.getElementById('problem-area-bottom').offsetTop;
const h3Margin = window.getComputedStyle(document.getElementsByTagName('h3')[0])
    .getPropertyValue('margin-bottom')
    .replace('px', '');
const displayCardPadding = window.getComputedStyle(document.getElementsByClassName('display-card')[0])
    .getPropertyValue('padding')
    .replace('px', '');
const displayHeight = window.innerHeight;

document.getElementById('run-result-stdout').style.height
    = document.getElementById('run-result-stderr').style.height
    = `${(displayHeight - offset - h3Margin * 2 - displayCardPadding) / 2}px`;
