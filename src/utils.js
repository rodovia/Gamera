const fs = require("fs");
const discord = require("discord.js");
const path = require("path");

const folders = []
const commands = new discord.Collection();

async function loadAllCommands(client) {
    let dir = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

    for (const file of fs.readdirSync("./src/commands")) {
        const command = require(`./commands/${file}`);
        commands.set(command.name, command);
        console.debug(`${command.name} pronto.`);
    }

    // evitar ficar atrás dos aliases no evento message.
    for (let command in commands.values()) {
        console.log(command);
    }
}

function containsObject(array, cont) {
    return array.findIndex((item, index) => item === cont) > -1;
}

function addGroup(group) {
    let joined = path.join(__dirname, "commands", group);
    if (!fs.existsSync(joined) || containsObject(folders, group)) { // arquivo não existe ou o grupo já está na lista
        return;
    }
    folders.push(path.join(__dirname, "commands", group));
    loadCommandsFromGroup(group);
}

function loadCommandsFromGroup(group) {
    const commandFolder = path.join(__dirname, "commands", group);
    for (const file of fs.readdirSync(commandFolder).filter(item => item.endsWith(".js"))) {
        const command = require(`${commandFolder}/${file}`);
        commands.set(command.name, command);
        console.log(commands);
    }
}

function removeGroup(group) {
    if (!containsObject(folders, group)) {
        return;
    }

    const commandFolder = path.join(__dirname, "commands", group);
    let index = folders.indexOf(group);
    folders.splice(index, 1);
    for (const file of fs.readdirSync(commandFolder).filter(item => item.endsWith(".js"))) {
        delete require.cache[require.resolve(`${commandFolder}/${file}`)]
    }
}

module.exports = {
    commands, loadAllCommands, addGroup, removeGroup
}