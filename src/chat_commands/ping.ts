import {ButtonStyle, ButtonBuilder, ActionRowBuilder} from "discord.js";
import ChatCommand from "../Components/ChatCommand";



const Hello: ChatCommand = {
    name: "ping",
    execute : async (message : any) => {

        await message.reply("Sla oque por aqui, beth feioso")

        // oxe aqui da certo??
        // olhar documentação....
    }
}



export default Hello;