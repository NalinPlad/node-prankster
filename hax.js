//               Get haxx
//               ./notmysql

const open = require ('open');
const express = require ('express');
const exec = require ('child_process');
const ws = require ('ws');
const path = require ('path')
const notifier = require ('node-notifier');
const loudness = require ('loudness');

const app = express();
const port = 3000;
const ws_port = 3001

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect("/index.html");
})


const clientIp = Object.values(require("os").networkInterfaces())
        .flat()
        .filter((item) => !item.internal && item.family === "IPv4")
        .find(Boolean).address;

app.get('/addr', (req, res) => {
  res.send(clientIp + ':' + ws_port)
})


app.listen(port, () => {  
  console.log('Navigate to ===> ' + clientIp + ':' + port)  
})

const wss = new ws.WebSocketServer({ port: ws_port });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    evilFunction(data,ws);
  });
});

// (async () => {
//   const tunnel = await lt({ port: 3000 });

//   // the assigned public url for your tunnel
//   // i.e. https://abcdefgjhij.localtunnel.me
//   console.log(tunnel.url);

//   tunnel.on('close', () => {
//     // tunnels are closed
//   });
// })();

function evilFunction(data,ws){
    data = data.toString()

    data = data.split(',')

    // Open Site
    if(data[0] == 'open'){
        if(data[1].startsWith('http')){
          console.log("URL: " + data[1]);
          open(data[1]);
        } else {
          ws.send('Start url with http(s)://')
        }
    
    // Send Notification
    } else if(data[0] == 'notif'){
      console.log("Notif: " + data[1]);
      if(data[2] == ''){
        notifier.notify(data[1]);
      } else {
        notifier.notify({
          title: data[2],
          message: data[1]
        })
      }
    // Send 'hello'
    } else if(data == 'hello'){
      ws.send('Hello ws client!')
    
    // Set volume
    } else if(data[0] == 'vol'){
      loudness.setVolume(data[1]);
      console.log("Vol: " + data[1])
    }
}

