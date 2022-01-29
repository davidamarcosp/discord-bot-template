import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { CommandNames } from '../../types/enums/ECommandNames';
import { DiscordModuleTypes } from '../../types/enums/EDiscordModuleTypes';
import { ButtonCustomIds } from '../../types/enums/EButtonCustomIds';
import { SlashCommandModule } from '../../types/interfaces/IDiscordModules';
import { CommandPermissionType } from '../../types/enums/ECommandPermissionType';

export const slashCommand: SlashCommandModule = {
  name: CommandNames.hello,
  type: DiscordModuleTypes.command,
  isGuildCommand: true,
  data: new SlashCommandBuilder()
    .setName(CommandNames.hello)
    .setDescription('This is a description')
    .setDefaultPermission(false),
  authorization: [
    {
      guildId: '798934781660364822',
      permissions: [
        {
          id: '837763525769298022',
          type: CommandPermissionType.role,
          permission: true
        },
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
