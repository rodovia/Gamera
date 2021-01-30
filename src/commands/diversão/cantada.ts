import { cantadas } from "../../cantadas.json";
import * as discord from "discord.js";

export async function execute(client: discord.Client, message: discord.Message, args: string[]) {
    let num = Math.round(Math.random() * cantadas.length);

    let cantada = cantadas[num - 1];
    await message.reply(cantada);
}

export const name = "cantada";
export const aliases = ["seduzir"];