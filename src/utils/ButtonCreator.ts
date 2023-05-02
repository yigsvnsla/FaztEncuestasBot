import { ButtonBuilder, ButtonStyle } from 'discord.js';

export class ButtonCreator extends ButtonBuilder {
    /**
     * 
     * @param _label string
     * @param _emoji string
     * @param _style string;
     * 
     * @Example
     * ```
     * //Example creator custom
     *  new ButtonCreator('Play', '▶', ButtonStyle.Danger)
     * ```
     */
    constructor(_label: string, _emoji: string, _style: ButtonStyle) {
        super({
            customId: `btn-${_label.toLowerCase()}`,
            custom_id: `_btn-${_label.toLowerCase()}`,
            emoji: {
                name: `${_emoji}`,
                id: `_emoji-${_label}`,
                animated: true
            },
            //@ts-ignore
            style: ButtonStyle[`${ButtonStyle[_style]}`],
            label: `${_label}`
        })
    };
}

