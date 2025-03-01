import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, Client, EmbedBuilder } from "discord.js";
import Button from "../Components/Button";
import Bj from "../game_utils/blackjack/bj";


const disabled_buttons = (): any => {
    const hit = new ButtonBuilder()
        .setCustomId("hit")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)
        .setLabel("Hit");
    const stand = new ButtonBuilder()
        .setCustomId("stand")
        .setStyle(ButtonStyle.Success)
        .setDisabled(true)
        .setLabel("Stand");
    const row = new ActionRowBuilder()
        .addComponents(hit, stand);


    return row;
}

const hit: Button = {
    customid: "hit",
    execute: async (interaction: ButtonInteraction) => {
        try {
            const client: Client = interaction.client;
            const player = client.blackjack.get(interaction.user.id);

            if (!player || player.userId != interaction.user.id) {
                await interaction.reply({ content: "Você não esta jogando", ephemeral: true });
                return;
            }

            const bj: Bj = player.bj;

            bj.player_push_card();



            const embed = new EmbedBuilder()
                .setDescription("cartas remaining : " + bj.get_remaining_cards())
                .addFields(
                    { name: "player hand", value: `${bj.format_hand()} = ${bj.playerHandValue}`, inline: true },
                    { name: "dealer hand", value: `${bj.format_hand(true, true)} = ${bj.dealerHandValue}`, inline: true }
                )
                .setTimestamp();

            if (bj.playerHandValue > 21) {
                client.blackjack.delete(interaction.user.id);
                const disabled_row = disabled_buttons();
                embed.setTitle("Você perdeu..");
                embed.setColor("Red");
                await interaction.update({ embeds: [embed], components: [disabled_row] });
                return;
            }
            await interaction.update({ embeds: [embed] });



        }
        catch (err) {
            throw err;
        }
    }
}



export default hit; 