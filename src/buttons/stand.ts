import Button from "../Components/Button";
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, Client, EmbedBuilder } from "discord.js";
import Bj from "../game_utils/blackjack/bj";


// gambirra da peste

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
const stand: Button = {
    customid: "stand", // associando...
    execute: async (interaction: ButtonInteraction) => {
        try {
            const avatar_url : any = interaction.user.avatarURL()
            const client: Client = interaction.client;

            if (!client) {
                await interaction.update({ content: "Cliente não foi resolvido", embeds: [], components: [] });
                return;
            }

            const player = client.blackjack.get(interaction.user.id);


            if (!player || player.userId != interaction.user.id) {
                return;
            }

            const bj : Bj = player.bj;

            bj.dealer_push_cards();


            const embed = new EmbedBuilder()
                .setDescription("cartas sobrando : " + bj.get_remaining_cards())
                .addFields(
                    { name: "player hand", value: `${bj.format_hand()} = ${bj.playerHandValue}`, inline: true },
                    { name: "dealer hand", value: `${bj.format_hand(true, false)} = ${bj.dealerHandValue}`, inline: true }
                )

                .setTimestamp();


            if (bj.dealerHandValue > 21 || bj.playerHandValue == 21 || bj.playerHand.length == 2 && bj.playerHandValue == 21) {
                client.blackjack.delete(interaction.user.id);
                const disabled_row = disabled_buttons();
                embed.setAuthor({name :`${interaction.user.username} venceu!`, iconURL : avatar_url });
                embed.setColor("Green");
                await interaction.update({ embeds: [embed], components: [disabled_row] });
                return;
            }
            if (bj.dealerHandValue > bj.playerHandValue && bj.dealerHandValue < 21) {
                client.blackjack.delete(interaction.user.id);
                const disabled_row = disabled_buttons();
                embed.setAuthor({name :`${interaction.user.username} perdeu!`, iconURL : avatar_url });
                embed.setColor("Red");
                await interaction.update({ embeds: [embed], components: [disabled_row] });
                return;
            }
            if (bj.playerHandValue > bj.dealerHandValue && bj.playerHandValue < 21) {
                client.blackjack.delete(interaction.user.id);
                const disabled_row = disabled_buttons();
                embed.setAuthor({name :`${interaction.user.username} venceu!`, iconURL : avatar_url });
                embed.setColor("Green");
                await interaction.update({ embeds: [embed], components: [disabled_row] });
                return;
            }
            if(bj.playerHandValue > 21 || bj.dealerHandValue == 21 || bj.dealerHand.length == 2 && bj.dealerHandValue == 21)
            {
                const disabled_row = disabled_buttons();
                embed.setAuthor({name :`${interaction.user.username} perdeu!`, iconURL : avatar_url });
                embed.setColor("Red");
                await interaction.update({ embeds: [embed], components: [disabled_row] });
                return;
            }

        }
        catch (err) {
            throw err;
        }
    }
}



export default stand;