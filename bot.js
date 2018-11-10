/*jshint esversion: 6 */

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.on('ready', () => {
    console.log('READY');
});

const HELPSTR = `PadBoard Bot commands:
!help - get help
!yog n - FUA Yog board for n light orbs
`;

client.on('message', msg => {
    match = handlers.filter(a => a[0].test(msg.content));
    if (match.length == 1) {
        match[0][1](msg);
    }
});

handlers = [
    [/!help/, msg => msg.channel.send(HELPSTR)],
    [/!yog \d+/, msg => {
        let m = msg.content;
        let spl = m.substring(1).split(" ");
        let cmd = spl[0];
        cmd = cmd.toLowerCase();
        let arg = spl[1];
        let alphaNumeric = /^[a-z0-9]+$/i;
        if (!alphaNumeric.test(arg))
            return 0;
        msg.channel.send("Yog " + arg + "-" + (30 - arg), {
            file: 'yog/' + arg + '.png'
        }).catch(errorHandler.bind(0, msg, cmd, arg));
    }],
    [/!eugeo/, msg => {
        msg.member.voiceChannel.join().then(connection => {
            const stream = fs.createReadStream('./eugeo-10.wav');
            connection.playStream(stream);
        });


    }]
];


function errorHandler(msg, cmd, arg) {
    msg.channel.send("No board found for " + cmd + " " + arg);
}

var auth = require('./auth.json');
client.login(auth.token);