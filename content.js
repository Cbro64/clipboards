function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function checkKey(e) {
    e = e || window.event;
    alert(e.keyCode);
}

document.onkeypress = checkKey;