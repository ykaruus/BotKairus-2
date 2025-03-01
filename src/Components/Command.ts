import { CommandInteraction, SlashCommandBuilder } from "discord.js";

interface Command {
    data: SlashCommandBuilder,
    execute(interaction : CommandInteraction): Promise<void>;
}



export default Command;