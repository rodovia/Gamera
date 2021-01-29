const discord = require("discord.js");

async function execute(client, message, args) {
    let lat = Math.abs(Date.now() - message.createdTimestamp);
    message.reply(`Pong! ${lat}ms https://giphy.com/gifs/tennis-4IAzyrhy9rkis`);
}

module.exports = {
    name: "ping",
    execute
}
