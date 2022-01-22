import { ButtonInteraction } from 'discord.js';
import { ButtonCustomIds } from '../types/EButtonCustomIds';

export const button = {
  customId: ButtonCustomIds.good,
  async execute(interaction: ButtonInteraction) {
    try {
      await interaction.reply({
        content: 'Im glad to hear that man :)',
        ephemeral: true
      });
    } catch (error) {
      console.log(error);
    }
  }
};
