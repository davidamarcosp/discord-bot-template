import { ButtonInteraction } from 'discord.js';
import { DiscordModuleTypes } from '../../types/enums/EDiscordModuleTypes';
import { ButtonCustomIds } from '../../types/enums/EButtonCustomIds';

export default {
  name: ButtonCustomIds.good,
  customId: ButtonCustomIds.good,
  type: DiscordModuleTypes.button,
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
