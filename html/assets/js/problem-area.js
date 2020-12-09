const displayHeight = window.innerHeight;
const offset = document.getElementById('problem-area-bottom').offsetTop;
const h1Margin = window.getComputedStyle(document.getElementsByTagName('h1')[0])
    .getPropertyValue('margin-bottom')
    .replace('px', '');
const h3Margin = window.getComputedStyle(document.getElementsByTagName('h3')[0])
    .getPropertyValue('margin-bottom')
    .replace('px', '');
const displayCardPadding = window.getComputedStyle(document.getElementsByClassName('display-card')[0])
    .getPropertyValue('padding')
    .replace('px', '');
const detailsHeight = window.getComputedStyle(document.getElementsByTagName('details')[0])
    .getPropertyValue('height')
    .replace('px', '');

document.getElementById('run-result-stdout').style.height
    = document.getElementById('run-result-stderr').style.height
    = `${(displayHeight - offset - h1Margin * 2 - h3Margin * 2 - displayCardPadding - detailsHeight) / 2}px`;
