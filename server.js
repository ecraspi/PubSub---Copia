/* client1 node.js
subscribe iot/client2/messages
publish   iot/client1/messages
publish   every 10s
vedere --> etc/activemq.xml */

var mqtt = require('mqtt');


var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
res.send('Pensando app Hello World!');
});

app.listen(app.get('port'), function () {
console.log('Example app listening on port ' + app.get('port') );
});



//localhost on fuse
//var client = mqtt.connect({
//    host: 'localhost',
//    port: 1883,
//    username: 'system',
//    password: 'manager'
//});

//Host: broker.hivemq.com
//TCP Port: 1883
//Websocket Port: 8000

//Host : iot.eclipse.org
//TCP Port: 1883
//TCP Port: 8883  (encrypted)
//The encrypted port support TLS v1.2, v1.1 or v1.0 with x509 
//Web Socket
//ws://iot.eclipse.org:80/ws
//wss://iot.eclipse.org:443/ws (secured)
//

//var client = mqtt.connect('mqtt://localhost:1883'); //node.js on localhost
//var client = mqtt.connect('mqtt://85.119.83.194'); //mosquitto.org
//var client = mqtt.connect('mqtt://test.mosquitto.org'); //mosquitto.org
//var client = mqtt.connect('mqtt://iot.eclipse.org'); //iot.eclipse.org
var client = mqtt.connect('mqtt://broker.hivemq.com'); //broker.hivemq.com

console.log('subscribe FKG/temp - publish FKG/temp');
console.log('connecting ... ');
client.on('connect', function () {
    console.log('connected');
    client.subscribe('FKG/temp');
    
});

client.on('message', function (topic, data) {

    console.log('topic ==>', topic.toString());
    console.log('payload ==>', data.toString());

});

var interval = setInterval(function(client) {

    // genero un valore casuale di temperatura

    Temperatura = "Temp = " + (parseInt(20 +( Math.random() * 100))/10.0).toString();

    // Pubblicoo il valore di Temperatura

    client.publish('FKG/temp',Temperatura);

}, 200, client);


