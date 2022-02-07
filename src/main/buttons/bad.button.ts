import { ButtonInteraction } from 'discord.js';
import { EDiscordModuleTypes } from '../../types/enums/EDiscordModuleTypes';
import { EButtonCustomIds } from '../../types/enums/EButtonCustomIds';
import { IButtonModule } from '../../types/interfaces/IDiscordModules';

export const button: IButtonModule = {
  customId: EButtonCustomIds.bad,
  type: EDiscordModuleTypes.button,
  async execute(interaction: ButtonInteraction) {
    try {
      await interaction.reply({
        content: 'Im sorry to hear that man :(',
        ephemeral: true
      });
    } catch (error) {
      console.log(error);
    }
  }
};
