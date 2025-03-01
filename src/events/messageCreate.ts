import { Client, Events, Message } from "discord.js";
import Event from "../Components/Event";
import ChatCommand from "../Components/ChatCommand";
import Log from "../LogManager";

const messageCreate: Event = {
    name: Events.MessageCreate,
    once: false,
    execute: async (client : Client, message : any) => {
        const prefix = "$$"
        if(message.author.id == client.user?.id) return;
        if(message.author.bot) return;

        
        
        if(message.content.startsWith(prefix))
        {
            const command_message = message.content.split(/ +/);
            const commandName = command_message[0];

            const command = client.chat_commands.get(commandName.split(prefix)[1]);
            if(!command)
            {
                await message.reply("Esse não é um comando valido, tente novamente!")
            } else {
                try {
                    await message.channel.sendTyping();
                    await command.execute(message, command_message);
                } catch(err)
                {
                    new Log().log("warning", `${err}`);
                    await message.reply("Desculpe um erro ocorreu : " + err)
                }
            }
        } else if (message.content == prefix)
        {
            return;
        }
    }
}



export default messageCreate;