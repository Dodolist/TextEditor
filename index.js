
// Shift, Ctrl. Alt 눌림 확인
var isShift;
var isCtrl; 
var isAlt;

document.onkeyup = function(e) {
    if (e.which == 16)  isShift = false;
    if (e.which == 17)  isCtrl = false;
    if (e.which == 18)  isAlt = false;
}

document.onkeydown = function(e) {
    if (e.which == 16)  isShift = true;
    if (e.which == 17)  isCtrl = true;
    if (e.which == 18)  isAlt = true;

    console.log(e.which, isShift, isCtrl, isAlt);
    
    if (e.which == 66 && isCtrl == true ) {  // Ctrl + b
        console.log("ctrl + b");
        setStyle('bold');
        
        return false;
    }
    if (e.which == 73 && isCtrl == true ) {  // Ctrl + i
        console.log("ctrl + i");
        setStyle('italic')
        
        return false;
    }
    if (e.which == 85 && isCtrl == true ) {  // Ctrl + u
        console.log("ctrl + u");
        setStyle('underline');
        
        return false;
    }
    if (e.which == 83 && isCtrl == true ) {  // Ctrl + s
        console.log("ctrl + s");
        setStyle('strikeThrough')
        
        return false;
    }

    if (isAlt == true && isCtrl == true) {
        // fontSize 변경
        if (e.which == 97) {
            console.log("ctrl + alt + 1");
            changeFontSize(1);
            return false;
        }
        if (e.which == 98) {
            console.log("ctrl + alt + 2");
            changeFontSize(2);
            return false;
        }
        if (e.which == 99) {
            console.log("ctrl + alt + 3");
            changeFontSize(3);
            return false;
        }
        if (e.which == 100) {
            console.log("ctrl + alt + 4");
            changeFontSize(4);
            return false;
        }
        if (e.which == 101) {
            console.log("ctrl + alt + 5");
            changeFontSize(5);
            return false;
        }
        if (e.which == 102) {
            console.log("ctrl + alt + 6");
            changeFontSize(6);
            return false;
        }
        if (e.which == 103) {
            console.log("ctrl + alt + 7");
            changeFontSize(7);
            return false;
        }

        // font Color 변경
        if (e.which == 81) {
            console.log("ctrl + alt + q, RED");
            setFontColor('#FF414C');
            document.getElementById('select-font-color').style.backgroundColor="#FF414C";
            return false;
        }
        if (e.which == 87) {
            console.log("ctrl + alt + w, YELLOW");
            setFontColor('#FFB800');
            document.getElementById('select-font-color').style.backgroundColor="#FFB800";
            return false;
        }
        if (e.which == 69) {
            console.log("ctrl + alt + e, GREEN");
            setFontColor('#14FF00');
            document.getElementById('select-font-color').style.backgroundColor="#14FF00";
            return false;
        }
        if (e.which == 82) {
            console.log("ctrl + alt + r, BLUE");
            setFontColor('#0085FF');
            document.getElementById('select-font-color').style.backgroundColor="#0085FF";
            return false;
        }
        if (e.which == 84) {
            console.log("ctrl + alt + t, WHITE");
            setFontColor('#FFFFFF');
            document.getElementById('select-font-color').style.backgroundColor="#FFFFFF";
            return false;
        }
    }
}

const editor = document.getElementById('editor');
const btnBold = document.getElementById('btn-bold');
const btnItalic = document.getElementById('btn-italic');
const btnUnderline = document.getElementById('btn-underline');
const btnStrike = document.getElementById('btn-strike');
const btnOrderedList = document.getElementById('btn-ordered-list');
const btnUnorderedList = document.getElementById('btn-unordered-list');

const fontSizeSelector = document.getElementById('select-font-size');
const fontSizeList = [16, 20, 24, 28, 32, 36, 48];
const selectFontColor = document.getElementById('select-font-color');


fontSizeSelector.addEventListener('change', function () {
    changeFontSize(this.value);
});

selectFontColor.addEventListener('change', function () {
    setFontColor(this.value);
});

btnBold.addEventListener('click', function () {
    setStyle('bold');
});

btnItalic.addEventListener('click', function () {
    setStyle('italic');
});

btnUnderline.addEventListener('click', function () {
    setStyle('underline');
});

btnStrike.addEventListener('click', function () {
    setStyle('strikeThrough')
});

btnOrderedList.addEventListener('click', function () {
    setStyle('insertOrderedList');
});

btnUnorderedList.addEventListener('click', function () {
    setStyle('insertUnorderedList');
});

// Button 클릭 후 에디터에게 다시 포커스
function focusEditor() {
    editor.focus({preventScroll: true});
}

editor.addEventListener('keydown', function () {
    checkStyle();
});

editor.addEventListener('mousedown', function () {
    checkStyle();
});

function setStyle(style) {
    document.execCommand(style);
    focusEditor();
    checkStyle();
}

function checkStyle() {
    if (isStyle('bold')) {
        btnBold.classList.add('active');
    } else {
        btnBold.classList.remove('active');
    }
    if (isStyle('italic')) {
        btnItalic.classList.add('active');
    } else {
        btnItalic.classList.remove('active');
    }
    if (isStyle('underline')) {
        btnUnderline.classList.add('active');
    } else {
        btnUnderline.classList.remove('active');
    }
    if (isStyle('strikeThrough')) {
        btnStrike.classList.add('active');
    } else {
        btnStrike.classList.remove('active');
    }
    if (isStyle('insertOrderedList')) {
        btnOrderedList.classList.add('active');
    } else {
        btnOrderedList.classList.remove('active');
    }
    if (isStyle('insertUnorderedList')) {
        btnUnorderedList.classList.add('active');
    } else {
        btnUnorderedList.classList.remove('active');
    }
    reportFont();
}

function changeFontSize(size) {
    document.execCommand('fontSize', false, size);
    focusEditor();
}

function setFontColor(color) {
    document.execCommand('foreColor', false, color);
    focusEditor();
}

function isStyle(style) {
    return document.queryCommandState(style);
}

function getComputedStyleProperty(el, propName) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(el, null)[propName];
    } else if (el.currentStyle) {
      return el.currentStyle[propName];
    }
}

function reportFont() {
    let containerEl, sel;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        containerEl = sel.getRangeAt(0).commonAncestorContainer;
        if (containerEl.nodeType === 3) {
          containerEl = containerEl.parentNode;
        }
      }
    } else if ((sel = document.selection) && sel.type !== 'Control') {
      containerEl = sel.createRange().parentElement();
    }
    
    if (containerEl) {
        const fontSize = getComputedStyleProperty(containerEl, 'fontSize');
        const fontColor = getComputedStyleProperty(containerEl, 'color');
        const size = parseInt(fontSize.replace('px', ''));
        fontSizeSelector.value = fontSizeList.indexOf(size) + 1;
        // fontName이 문자열 "폰트명"으로 오기 때문에 "를 제거해주는 코드 추가
        //fontColorSelector.value = rgbToHex(fontColor).toUpperCase();
    }
}