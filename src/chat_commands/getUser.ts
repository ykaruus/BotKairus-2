import { ButtonStyle, ButtonBuilder, ActionRowBuilder, Client, EmbedBuilder } from "discord.js";
import ChatCommand from "../Components/ChatCommand";
import CoreService from "../Service/coreService";



const reconnect: ChatCommand = {
    name: "pegar",
    execute: async (message: any, opts: any[]) => {
        const core = new CoreService(message.client);

        let userId = opts[1];

        if (!userId) {
            userId = message.author.id;
        }

        const data = await core.getUser(userId);

        if (!data || !data.success) {
            return await message.reply("O usuario não esta cadastrado no banco de dados, verifique o ID");
        }
        const user = data.user;

        const embed = new EmbedBuilder()
            .setTitle("data retrieve")
            .setDescription("info do user cadastrado")
            .addFields(
                {
                    name: "DB ID",
                    value: `${user.id}`,
                    inline: false
                },
                {
                    name: "user id",
                    value: `${user.user_id}`,
                    inline: false
                },
                {
                    name: "username",
                    value: `${user.username}`,
                    inline: false
                }
            )
            .setThumbnail(`https://cdn.discordapp.com/avatars/${user.user_id}/${user.avatar_url}`);

        await message.reply({ embeds: [embed] })

        console.log(userId);
    }
}



export default reconnect;