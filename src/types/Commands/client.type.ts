import { SlashCommandBuilder } from 'discord.js'

export interface DiscordClientEvent {
    once: boolean,
    on: boolean
    name: string;
    execute(interaction?: any | any[]): Promise<void>;
}

export interface DiscordClientCommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    execute?(interaction: any | any[]): Promise<void>;
    autocomplete?(interaction: any | any[]): Promise<void>;
}
