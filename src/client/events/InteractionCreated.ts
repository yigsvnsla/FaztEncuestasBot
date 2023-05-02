
import { ChatInputCommandInteraction, Events, MessageComponentInteraction } from 'discord.js';
import DiscordClient from '../client';

export default {
	name: Events.InteractionCreate,
	async execute(interaction: ChatInputCommandInteraction | MessageComponentInteraction) {
		try {
			if (interaction.isChatInputCommand()) {
				const { commandName, client } = interaction
				const _discordClient = client as DiscordClient
				const _command = _discordClient.commands.get(commandName)
				if (!_command) throw new Error(`No command matching "${commandName}" was found.`);
				await _command.execute!(interaction);
			}

			if (interaction.isAutocomplete()) {
				const { commandName, client } = interaction
				const _discordClient = client as DiscordClient
				const _command = _discordClient.commands.get(commandName)
				if (!_command) throw new Error(`No command matching "${commandName}" was found.`);
				await _command.autocomplete!(interaction);
			}
		} catch (error) {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			console.error(`📕: Error executing Command`, error);
		}
	},
};