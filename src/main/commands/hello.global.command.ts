import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { CommandNames } from '../../types/enums/ECommandNames';
import { DiscordModuleTypes } from '../../types/enums/EDiscordModuleTypes';
import { ButtonCustomIds } from '../../types/enums/EButtonCustomIds';
import { SlashCommandModule } from '../../types/interfaces/IDiscordModules';
import { CommandPermissionType } from '../../types/enums/ECommandPermissionType';

export const slashCommand: SlashCommandModule = {
  name: CommandNames.helloGlobal,
  type: DiscordModuleTypes.command,
  isGuildCommand: false,
  data: new SlashCommandBuilder()
    .setName(CommandNames.hello)
    .setDescription('this is a description for a global command')
    .setDefaultPermission(false),
  authorization: [
    {
      permissions: [
        {
          id: '147926645653766144',
          type: CommandPermissionType.user,
          permission: true
        }
      ]
    }
  ],
  async execute(interaction: CommandInteraction) {
    try {
      const firstButton = new MessageButton().setCustomId(ButtonCustomIds.good).setLabel('Good').setStyle('PRIMARY');
      const secondButton = new MessageButton().setCustomId(ButtonCustomIds.bad).setLabel('Bad').setStyle('PRIMARY');
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
