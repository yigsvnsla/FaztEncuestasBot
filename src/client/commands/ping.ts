import { EmbedCreator } from '../../utils/EmbedCreator';

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: ChatInputCommandInteraction) {
        const res = await interaction.deferReply({fetchReply:true})
        const embed = new EmbedCreator('info', {
            fields: [
                {
                    name: '🏓 Pong!!',
                    value: `🤖: ${interaction.client.ws.ping}ms | 🧚‍♂️ ${res.createdTimestamp - interaction.createdTimestamp}ms`
                }
            ]
        })
        await interaction.editReply({ content:'', embeds: [embed] });
    },
};
