import { Client, Message } from "discord.js"


interface ChatCommand {
    name: string,
    execute(...args: any[]) : Promise<void>
}





export default ChatCommand;