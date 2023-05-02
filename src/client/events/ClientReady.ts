import { Events } from 'discord.js';
import DiscordClient  from '../client';

export default {
	name: Events.ClientReady,
	once: true,
	execute(client:DiscordClient) {
		console.log(`-- Logged Client: ${client.user?.tag} --`);
	},
};