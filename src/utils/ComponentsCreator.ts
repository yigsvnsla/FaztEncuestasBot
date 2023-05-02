import { ActionRowBuilder, ButtonBuilder } from 'discord.js';

export class ComponentsCreator extends ActionRowBuilder<ButtonBuilder> {

    constructor(components: any[]) {
        super({ components })
    }

}
