import * as discord from "discord.js";

export async function execute(client: discord.Client, message: discord.Message, args: string[]) {
    let lat =  message.createdTimestamp - Date.now();
    await message.reply(`Pong! ${lat}ms https://giphy.com/gifs/tennis-4IAzyrhy9rkis`);
}

export const name = "ping";
