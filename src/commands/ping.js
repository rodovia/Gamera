const discord = require("discord.js");

function execute(client, message, args) {
    let lat = Date.now() - message.createdTimestamp
    message.reply(`Pong! ${lat}ms https://tenor.com/KWO8.gif`);
}

module.exports = {
    name: "ping",
    execute
}