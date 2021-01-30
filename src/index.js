const discord = require("discord.js");
const utils = require("./utils");
const config = require("./credentials.json");

const client = new discord.Client();
client.on("ready", () => {
    console.log(`Bot pronto! ${client.user.tag} (${client.user.id})`);
    
    utils.addGroup("miscelânea");
    utils.addGroup("diversão");
});

client.on("message", async (message) => {
    if (!message.content.startsWith(config.prefixo) || message.author.bot) return;

    const args = message.content.slice(config.prefixo.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!utils.commands.has(command)) return;
    try {
        var cmd = utils.commands.get(command);
        await cmd.execute(client, message, args);
    } catch(error) {
        console.error(error);
        message.reply("Houve um erro ao executar esse comando!");
    }
});

client.login(config.token);