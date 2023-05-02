import { EmbedData } from "discord.js";

export type EmbedCreatorConfig = Partial<Omit<EmbedData, 'color'>>;

export type EmbedCreatorTypes = 'success' | 'danger' | 'warning' | 'info';
