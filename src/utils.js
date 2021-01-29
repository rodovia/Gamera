const discord = require("discord.js");
const fs = require("fs");

function loadAllCommands(client) {
    client.commands = new discord.Collection();

    let dir = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
    for (const file of fs.readdirSync("./src/commands")) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);

        console.debug(`${command.name} pronto.`);
    }

    // evitar ficar atrás dos aliases no evento message.
    for (let command in client.commands) {
        if (command.aliases !== null || command.aliases !== undefined) {
            for (let alias in command.aliases) {
                commands.set(alias, command);
            }
        }
    }
}

module.exports = {
    loadAllCommands
}
