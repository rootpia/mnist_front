var can;
var ct;
var ox = 0, oy = 0, x = 0, y = 0;
var mf = false;
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
    $('#answer').html("")
    $('ul#anslist > li').each(function(){
        $(this).remove();
    });
}

// 画像のサーバーへのPOST
function sendImage() {
    $('#answer').html("")
    $('ul#anslist > li').each(function(){
        $(this).remove();
    });

    var img = document.getElementById("can").toDataURL('image/png');
    img = img.replace('image/png', 'image/octet-stream');
    $.ajax({
        type: "POST",
        url: "/api",
        data: {
            "img": img
        }
    })
    .done( (data) => {
        $('#answer').html('predict = <span class="answer">'+data['ans']+'</span>')
        $('ul#anslist').append('<li>0: '+data['c0']+'</li>');
        $('ul#anslist').append('<li>1: '+data['c1']+'</li>');
        $('ul#anslist').append('<li>2: '+data['c2']+'</li>');
        $('ul#anslist').append('<li>3: '+data['c3']+'</li>');
        $('ul#anslist').append('<li>4: '+data['c4']+'</li>');
        $('ul#anslist').append('<li>5: '+data['c5']+'</li>');
        $('ul#anslist').append('<li>6: '+data['c6']+'</li>');
        $('ul#anslist').append('<li>7: '+data['c7']+'</li>');
        $('ul#anslist').append('<li>8: '+data['c8']+'</li>');
        $('ul#anslist').append('<li>9: '+data['c9']+'</li>');
    });
}


