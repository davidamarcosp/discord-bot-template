import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { ECommandNames } from '../../types/enums/ECommandNames';
import { EDiscordModuleTypes } from '../../types/enums/EDiscordModuleTypes';
import { EButtonCustomIds } from '../../types/enums/EButtonCustomIds';
import { IApplicationCommandModule } from '../../types/interfaces/IDiscordModules';
import { EApplicationCommandPermissionType } from '../../types/enums/ECommandPermissionType';
import { EApplicationCommandTypes } from '../../types/enums/EApplicationCommandTypes';
import { EApplicationCommandOptionTypes } from '../../types/enums/EApplicationCommandOptionTypes';

export const slashCommand: IApplicationCommandModule = {
  name: ECommandNames.hello,
  type: EDiscordModuleTypes.command,
  isGuildCommand: true,
  data: {
    name: ECommandNames.hello,
    description: 'This is a new description pls work',
    default_permission: false,
    type: EApplicationCommandTypes.CHAT_INPUT,
    options: [
      {
        type: EApplicationCommandOptionTypes.STRING,
        name: 'option',
        description: 'this is an option example',
        required: true,
        choices: [
          {
            name: 'Option 1',
            value: 'option1'
          },
          {
            name: 'Option 2',
            value: 'option2'
          }
        ]
      }
    ]
  },
  authorization: [
    {
      guildId: '798934781660364822',
      permissions: [
        {
          id: '837763525769298022',
          type: EApplicationCommandPermissionType.ROLE,
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
