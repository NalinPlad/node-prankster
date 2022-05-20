con = document.getElementById('con_stat');

con.classList.add('con_yellow')
con.innerText = 'Status:    Connecting...';

socket = new WebSocket('ws://'  + window.location.hostname + ':3001')

out = document.getElementById('out');

// Ping Pong
function ping() {
    socket.send('__ping__');
    tm = setTimeout(function () {

        con.classList.remove('con_yellow')
        con.classList.remove('con_green')
        con.classList.add('con_red')
        con.innerText = 'Status:    Not Connected...'

}, 5000);
}

function pong() {
    clearTimeout(tm);
    con.classList.remove('con_yellow')
    con.classList.remove('con_red')
    con.classList.add('con_green')
    con.innerText = 'Status:    Connected'
}


socket.addEventListener('open', function (event) {
    socket.send('hello');
    ping();
    setInterval(ping, 3000);
});

socket.addEventListener('message', function (event) {
    console.log(event.data);
    if (event.data == '__pong__') {
        pong();
        return;
    }

    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    out.innerHTML += "<br/><b class='serv_text'>[SERVER][" + current + "] ===></b> " + event.data;
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