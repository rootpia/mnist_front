var can;
var ct;
var ox = 0, oy = 0, x = 0, y = 0;
var mf = false;
var keyname = "";

function mam_draw_init() {
    can = document.getElementById("can");
    can.addEventListener("touchstart", onDown, false);
    can.addEventListener("touchmove", onMove, false);
    can.addEventListener("touchend", onUp, false);
    can.addEventListener("mousedown", onMouseDown, false);
    can.addEventListener("mousemove", onMouseMove, false);
    can.addEventListener("mouseup", onMouseUp, false);
    ct = can.getContext("2d");
    ct.strokeStyle = "#000000";
    ct.lineWidth = 15;
    ct.lineJoin = "round";
    ct.lineCap = "round";
    clearCan();
}
function onDown(event) {
    mf = true;
    ox = event.touches[0].pageX - event.target.getBoundingClientRect().left;
    oy = event.touches[0].pageY - event.target.getBoundingClientRect().top;
    event.stopPropagation();
}
function onMove(event) {
    if (mf) {
        x = event.touches[0].pageX - event.target.getBoundingClientRect().left;
        y = event.touches[0].pageY - event.target.getBoundingClientRect().top;
        drawLine();
        ox = x;
        oy = y;
        event.preventDefault();
        event.stopPropagation();
    }
}
function onUp(event) {
    mf = false;
    event.stopPropagation();
}
function onMouseDown(event) {
    ox = event.clientX - event.target.getBoundingClientRect().left;
    oy = event.clientY - event.target.getBoundingClientRect().top;
    mf = true;
}
function onMouseMove(event) {
    if (mf) {
        x = event.clientX - event.target.getBoundingClientRect().left;
        y = event.clientY - event.target.getBoundingClientRect().top;
        drawLine();
        ox = x;
        oy = y;
    }
}
function onMouseUp(event) {
    mf = false;
}
function drawLine() {
    ct.beginPath();
    ct.moveTo(ox, oy);
    ct.lineTo(x, y);
    ct.stroke();
}
function clearCan() {
    ct.fillStyle = "rgb(255,255,255)";
    ct.fillRect(0, 0, can.getBoundingClientRect().width, can.getBoundingClientRect().height);
//     $('#answer').html("")
//     $('ul#anslist > li').each(function(){
//         $(this).remove();
//     });
    const group = document.getElementById("radiogroup");
    for(var i=0; i<9; i++){
        const idx = 3 * i;
        group.children[idx].checked = false;
    }
    group.setAttribute("style", "pointer-events: none");
}

// 画像のサーバーへのPOST
function sendImage() {
    var img = document.getElementById("can").toDataURL('image/png');
    img = img.replace('image/png', 'image/octet-stream');
    $.ajax({
        type: "POST",
        url: "/api/answer",
        data: {
            "img": img
        }
    })
    .done( (data) => {
        const idx = 3 * parseInt(data['ans'], 10);
        const group = document.getElementById("radiogroup");
        group.setAttribute("style", "pointer-events: ");
        const target =  group.children[idx];
        target.checked = true;
        keyname = data['keyname']
    });
}

function answerCheck() {
    // 選択ボタンの取得
    var targetIdx = -1;
    const group = document.getElementById("radiogroup");
    const targets =  group.children;
    for(var i=0; i<9; i++){
        const idx = 3 * i;
        if (targets[idx].checked) {
            targetIdx = i;
            break;
        }
    }

   $.ajax({
        type: "POST",
        url: "/api/annotation",
        data: {
            "keyname": keyname,
            "newnum": targetIdx
        }
    })
    .done( (data) => {
        result = data['result']
    });
}
