const discord = require("discord.js");

<<<<<<< HEAD
async function execute(client, message, args) {
    let lat = Date.now() - message.createdTimestamp
    message.reply(`Pong! ${lat}ms https://tenor.com/KWO8.gif`);
=======
function execute(client, message, args) {
    let lat = Math.abs(Date.now() - message.createdTimestamp);
    message.reply(`Pong! ${lat}ms https://giphy.com/gifs/tennis-4IAzyrhy9rkis`);
>>>>>>> 171144f1801d714c22774b37e7968ae3f59f830a
}

module.exports = {
    name: "ping",
    execute
}