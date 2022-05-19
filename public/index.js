const socket = new WebSocket('ws://10.89.206.52:3001');

socket.addEventListener('open', function (event) {
    socket.send('hello');
});

out = document.getElementById('out');
socket.addEventListener('message', function (event) {
    console.log(event.data);
    out.innerHTML += "<br/>[SERVER] ===> " + event.data;
})

function send(data){
    socket.send(data);
}

url_box = document.getElementById('url')
function open_url(){
    url = url_box.value;
    
    socket.send(['open',url])
}

notify_title = document.getElementById('notify_title')
notify_box = document.getElementById('notify')

function notify_text(){
    ttl = notify_title.value;
    msg = notify_box.value;

    socket.send(['notif',msg,ttl])
}

var slider = document.getElementById("vol_slider");
var output = document.getElementById("vol_preview");

slider.oninput = function() {
    output.innerHTML = this.value * 10;
}

function change_volume(){
    socket.send(['vol',slider.value * 10])
}