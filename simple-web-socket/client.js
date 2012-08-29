var WSClient = require('websocket').client;

new WSClient()
.on('connect', function(conn) {
    var msg = "Hello";
    
    conn.send(msg);
    console.log("Sent: " + msg);

    conn
    .on('message', function(msg) {
        console.log("Recevied: " + msg.utf8Data);
    })
    .on('close', function(code, desc) {
        console.log("Disconnected: " + code + " - " + desc);
    })
    .on('error', function(error) {
        console.log("Error: " + error.toString());
    });
})
.on('connectFailed', function(error) {
    console.log("Connect Error: " + error.toString());
})
.connect('ws://localhost:8080/', null, 'http://localhost:8080');
