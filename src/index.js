const discord = require("discord.js");

const client = new discord.Client({
    allowedMentions: {
        roles: false
    },
    disableMentions: "everyone"
});

const { loadAllCommands, commands } = require("./utils");

client.on("ready", () => {
    console.log("Bot pronto!");
    loadAllCommands(client);
});

client.on("message", async (message) => {
    if (!message.content.startsWith(process.env.PREFIXO) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIXO.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    try {
        let cmd = client.commands.get(command);
        await cmd.execute(client, message, args);
    } catch(error) {
        console.error(error);
        message.reply("Houve um erro ao executar esse comando!");
    }
});
client.login(process.env.TOKEN);