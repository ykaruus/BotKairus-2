import { ActionRow, ButtonStyle, Client, Interaction, Message } from "discord.js";
import ChatCommand from "../Components/ChatCommand";
import Bj from "../game_utils/blackjack/bj";
import { ActionRowBuilder, EmbedBuilder } from "@discordjs/builders";
import { ButtonBuilder } from "@discordjs/builders";


const blackjack: ChatCommand = {
    name: "blackjack",
    execute: async (message: any) => {
        const client: Client = message.client; // nunca faça isso, acho que n preciso disso...

        if (!client) {
            return await message.reply("Client não pode ser resolvido.");
        }

        try {
            // resumindo preciso setar e checar o jogador Na client.blackjack;
            const playerContext = client.blackjack.get(message.author.id); // vai procurar pelo id do autor da mensagem;

            if (playerContext) {
                return await message.reply({content : "Você ja tem uma instancia de blackjack rodando.."
                });

                // vou ter que fazer na mão drofaaefknafnw
            }

            // aqui ele vai criar a mão pro jogador
            const bj = new Bj(); // classe que gerência cartas, valores e etc...

            await bj.shuffle_cards();// isso retorna uma promise deve ser assincrono...

            bj.generate_deck() // aqui ele gera todos os decks e valores...


            const embed = new EmbedBuilder()
                .setAuthor({ name: "Usado por : " + message.author.username, iconURL: message.author.avatarURL() })
                .addFields(
                    { name: "player hand", value: `${bj.format_hand()} = ${bj.playerHandValue}`, inline: true },
                    { name: "dealer hand", value: `${bj.format_hand(true, true)} = ${bj.dealerHandValue}`, inline: true }
                )
                .setTimestamp();

            const hit = new ButtonBuilder()
                .setCustomId("hit")
                .setStyle(ButtonStyle.Primary)
                .setLabel("Hit");
            const stand = new ButtonBuilder()
                .setCustomId("stand")
                .setStyle(ButtonStyle.Success)
                .setLabel("Stand");
            const row = new ActionRowBuilder()
                .addComponents(hit, stand);

            await message.reply({ embeds: [embed], components: [row] });

            // n setei o client.blackjack ta sempre retornando indefinido....

            client.blackjack.set(message.author.id, {userId : message.author.id, bj : bj});



            //vish

        } catch (error) {
            throw error;
        }
    }
}


export default blackjack;