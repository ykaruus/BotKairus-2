import { Message } from "discord.js";
import ChatCommand from "../Components/ChatCommand";
import CoreService from "../Service/coreService";





const cadastrar : ChatCommand = {
    name:"cadastro",
    execute: async (message : Message) => {

        const userId : string = message.author.id;
        const username : string = message.author.username;
        const avatar_url = message.author.avatarURL();

        const core = new CoreService(message.client);

        const success = await core.setUser(userId, username, message.author.avatarURL());
        if(!success)
        {
            await message.reply("Erro ao cadastrar usuario, tente novamente, ou verifique se você ja não tem cadastro com sla o comando ai");
        } else {
            await message.reply("Cadastrado com sucesso..");
        }

    }
}



export default cadastrar;