import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { ECommandNames } from '../../types/enums/ECommandNames';
import { EDiscordModuleTypes } from '../../types/enums/EDiscordModuleTypes';
import { EButtonCustomIds } from '../../types/enums/EButtonCustomIds';
import { IApplicationCommandModule } from '../../types/interfaces/IDiscordModules';
import { EApplicationCommandPermissionType } from '../../types/enums/ECommandPermissionType';
import { EApplicationCommandTypes } from '../../types/enums/EApplicationCommandTypes';

export const slashCommand: IApplicationCommandModule = {
  name: ECommandNames.helloGlobal,
  type: EDiscordModuleTypes.command,
  isGuildCommand: false,
  data: {
    name: ECommandNames.helloGlobal,
    description: 'this is a description for a global command',
    default_permission: false,
    type: EApplicationCommandTypes.CHAT_INPUT
  },
  authorization: [
    {
      permissions: [
        {
          id: '147926645653766144',
          type: EApplicationCommandPermissionType.USER,
          permission: true
        }
      ]
    }
  ],
  async execute(interaction: CommandInteraction) {
    try {
      const firstButton = new MessageButton().setCustomId(EButtonCustomIds.good).setLabel('Good').setStyle('PRIMARY');
      const secondButton = new MessageButton().setCustomId(EButtonCustomIds.bad).setLabel('Bad').setStyle('PRIMARY');
      const row = new MessageActionRow().addComponents(firstButton, secondButton);

      await interaction.reply({
        content: `Hello ${interaction.member}, how are you?`,
        components: [row],
        ephemeral: true
      });
    } catch (error) {
      console.log(error);
    }
  }
};
