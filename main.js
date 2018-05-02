//var auth = require('./ponz.json');
var auth = require('./auth.json');
const Discord = require("discord.js");
const client = new Discord.Client();
var getJSON = require('get-json');
var DebugChannel = null;

client.on("ready", () => {
  console.log("I am ready!");
  //client.channels.get('411155617567211522').send('testing 1234, starting up');
  DebugChannel = client.channels.get(auth.DebugChannel);
  DebugChannel.send('Bot code starting up!');
});

client.on("message", async message => {
    try {
    //    console.log(message.content);
    if (message.content.startsWith(auth.Prefix)) {
        const args = message.content.trim().split(/ +/g);
        const command = args.shift().toLowerCase().slice(1,20);
        var st = "Bot_"+command;
      
        var module = require("./Commands/"+st+".js");
        module[st](message,args);
        }
    } catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
        DebugChannel.send('Exception in code: ' + ex.message);
        DebugChannel.send(ex.stack);
    }
});


client.login(auth.Token);

/*
var game = require("./Commands/Bot_c4.js");
game["Bot_c4"]('  ',[]);
*/

/*

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// Draw cat with lime helmet
loadImage('examples/images/lime-cat.jpg').then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70)

  console.log('<img src="' + canvas.toDataURL() + '" />')
})




*/