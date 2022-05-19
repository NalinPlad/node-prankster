const socket = new WebSocket('ws://192.168.1.188:3001');

socket.addEventListener('open', function (event) {
    socket.send('Hello');
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

notify_box = document.getElementById('notify')
function notify_text(){
    msg = notify_box.value;

    socket.send(['notif',msg])
}