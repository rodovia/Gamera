const discord = require("discord.js");
const ms = require("ms");

async function execute(client, message, args) {
    var load = ms(args.slice(0, 1).join(" "));
    console.log(load);
    var mutedRole = message.guild.roles.cache.find((role) => role.name === "Muted");

    if (mutedRole === undefined) {
        message.guild.roles.create({
            data: {
                name: "Muted"
            }
        }).then((role) => {
            mutedRole = role;
        });
    }

    message.member.roles.add(mutedRole).then((member) => {
        message.reply(":ok_hand:");
    });

    setTimeout((member) => {
        member.roles.remove(mutedRole).then(() => {});
    }, load, message.member);
}

module.exports = {
    name: "selfmute",
    execute
}