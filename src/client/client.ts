
import { Client, Collection, ClientOptions, GatewayIntentBits, SlashCommandBuilder } from 'discord.js'

import path from "path";
import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs"
import * as dotenv from 'dotenv';
import { DiscordClientCommand, DiscordClientEvent } from '../types/Commands/client.type';
dotenv.config()

export default class DiscordClient extends Client {

    public commands: Collection<string, DiscordClientCommand>

    constructor() {
        console.clear()
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
            ]
        })

        this.commands = new Collection()

        this.launch()
    }

    private async loadCommands() {
        try {
            const _listCommands: DiscordClientCommand[] = []
            const CommandsPath = path.join(`${__dirname}/commands`);
            const ExistPath = existsSync(CommandsPath)
            if (!ExistPath) throw new Error(`the folder in path ${CommandsPath} Not exist, Create folder to be continue...`);
            const CommandsFiles = await readdir(CommandsPath)
            for (const file of CommandsFiles) {
                const Commandscript = await import(`${CommandsPath}/${file}`);
                _listCommands.push(Commandscript.default)
            }
            for (const command of _listCommands) {
                this.commands.set(command.data.name, { ...command })
            }
            console.log("\x1b[32m", '🤖 : Loaded Commands', "\x1b[37m");
        } catch (error) {
            console.error("\x1b[35m", `${error}`, "\x1b[37m");
        }
    }

    private async loadEvents() {
        try {
            const _listEvents: DiscordClientEvent[] = []
            const EventsPath = path.join(`${__dirname}/events`);
            const ExistPath = existsSync(EventsPath)
            if (!ExistPath) throw new Error(`the folder in path ${EventsPath} Not exist, Create folder to be continue...`);
            const EventsFiles = await readdir(EventsPath)
            for (const file of EventsFiles) {
                const eventScript = await import(`${EventsPath}/${file}`);
                _listEvents.push(eventScript.default)
            }
            for (let event of _listEvents) {
                if (event.once) this.once((event.name), (...args) => event.execute(...args));
                if (!event.once) this.on((event.name), (...args) => event.execute(...args));
            }
            console.log("\x1b[32m", '🤖 : Loaded Events', "\x1b[37m");
        } catch (error) {
            console.error("\x1b[35m", `${error}`, "\x1b[37m");
        }
    }
    private async launch() {
        await this.loadEvents()
        await this.loadCommands()
        console.log("\x1b[37m",'🤖 : Launching');
        await this.login(process.env.ENV_TOKEN)
    }

}
