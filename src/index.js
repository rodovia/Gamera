const discord = require("discord.js");

const client = new discord.Client({
    allowedMentions: {
        roles: false
    },
    disableMentions: "everyone"
});

const { loadAllCommands, commands } = require("./utils");
const config = require("./credentials.json");

client.on("ready", () => {
    console.log("Bot pronto!");
    loadAllCommands(client);
});

client.on("message", (message) => {
    if (!message.content.startsWith(config.prefixo) || message.author.bot) return;

    const args = message.content.slice(config.prefixo.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(client, message, args);
    } catch(error) {
        console.error(error);
        message.reply("Houve um erro ao executar esse comando!");
    }
});

client.login(config.token);