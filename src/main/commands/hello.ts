import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { CommandNames } from '../types/ECommandNames';
import { ButtonCustomIds } from '../types/EButtonCustomIds';

export const command = {
  data: new SlashCommandBuilder().setName(CommandNames.hello).setDescription('It says hello!'),
  async execute(interaction: CommandInteraction) {
    try {
      const user = interaction.member.user.username;
      const firstButton = new MessageButton().setCustomId(ButtonCustomIds.good).setLabel('Good').setStyle('PRIMARY');
      const secondButton = new MessageButton().setCustomId(ButtonCustomIds.bad).setLabel('Bad').setStyle('PRIMARY');
      const row = new MessageActionRow().addComponents(firstButton, secondButton);
      await interaction.reply({
        content: `Hello ${user}, how are you?`,
        components: [row],
        ephemeral: true
      });
    } catch (error) {
      console.log(error);
    }
  }
};
