function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function pasteAtCursor(toPaste) {
    if(toPaste) { // if toPaste is defined
        var el = document.activeElement; // get current text field
        var start = el.selectionStart;
        var end = el.selectionEnd;
        var text = el.value;
        var before = text.substring(0, start); // text already there, before the cursor
        var after  = text.substring(end, text.length); // text already there, after the cursor
        el.value = (before + toPaste + after); // replace old contents with inserted text
        el.selectionStart = el.selectionEnd = start + toPaste.length; // move cursor to end of inserted text
        el.focus();
    }
}

function checkKey(e) {
    e = e || window.event;
    if (e.shiftKey && e.ctrlKey && e.keyCode >= 48 && e.keyCode <= 57) { // only react to number keys
	// save
	save = {};
	save[e.keyCode] = getSelectionText();
	chrome.storage.sync.set(save, null);	
    } else if (e.shiftKey && e.altKey && e.keyCode >= 49 && e.keyCode <= 58) {
	// load
	chrome.storage.sync.get(null, function(paste) {
	  pasteAtCursor(paste[e.keyCode]);
        });
    }
}

document.onkeydown = checkKey;