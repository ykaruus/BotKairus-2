import axios from "axios";
import Log from "../LogManager";
import { clientId, token } from "../secret/secret.json"
import { Client } from "discord.js";



const Routes = {
    connect: (client_id: string, token_client: string): string => {
        return `http://localhost:5000/api/connect/${client_id}/${token_client}`
    },
    prefix: "http://localhost:5000/api/perfix",
    user: "http://localhost:5000/api/user"

}


class CoreService {
    private client: Client
    constructor(client: Client) {
        this.client = client;
    }

    async connect() {
        try {
            const response = await axios.get(Routes.connect(clientId, token));

            if (response.status == 200) {
                const json = response.data

                this.client.token = json.token;
            }
        } catch (err) {
            new Log().log("critical", `Core Service :ocorreu um erro : ${err} `)
        }

    }

    async getPrefix() {
        try {
            const response = await axios.get(Routes.prefix, {
                headers: {
                    "authorization": this.client.token
                }
            });
            if (response.status == 200) {
                new Log().log("success", `CoreService : Get data success : ${response.data.prefix}`)
                this.client.prefix = response.data.prefix;
            } else {
                throw new Error("Core Service => Server Error " + response.status)
            }
        } catch (error) {
            new Log().log("critical", `Core Service :ocorreu um erro : ${error} `)
        }


    }
    async getUser(userId : string) {
        try {
            const response = await axios.get(Routes.user + `/${userId}`, {
                headers: {
                    "authorization": this.client.token
                }
            });
            if (response.status == 200) {
                new Log().log("success", `CoreService : Get user success : ${response.data.success}`)
                return response.data;
            }
        } catch (error) {
            new Log().log("critical", `Core Service :ocorreu um erro : ${error} `)
        }


    }

    async setUser(userId: string, username: string, avatar_url: any) {
        try {
            const data = {
                userId,
                username,
                avatar_url
            }
            const response = await axios.post(Routes.user, {data}, {
                headers: {
                    "authorization": this.client.token,
                }
            });
            console.log(response.data)
            if (response.status == 200) {
                new Log().log("success", `CoreService : set user success`);
                return true;
            }
        } catch (error) {
            new Log().log("critical", `Core Service :ocorreu um erro : ${error} `);
            return false;
        }
    }
}



export default CoreService;