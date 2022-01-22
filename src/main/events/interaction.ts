import {
  ButtonInteraction,
  CommandInteraction,
  Interaction,
  MessageComponentInteraction,
  SelectMenuInteraction
} from 'discord.js';
import { DiscordEventNames } from '../../types/EDiscordEventNames';
import { BotClient } from '../../commons/client';

export const event = {
  name: DiscordEventNames.interactionCreate,
  async execute(
    interaction:
      | Interaction
      | ButtonInteraction
      | CommandInteraction
      | SelectMenuInteraction
      | MessageComponentInteraction,
    client: BotClient
  ) {
    try {
      if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (command) await command.execute(interaction, client);
        // Throw error when the command wasnt found
      }
      if (interaction.isButton()) {
        const button = client.buttons.get(interaction.customId);
        if (button) await button.execute(interaction, client);
        // Throw error when the button wasnt found
      }
    } catch (error) {
      console.log(error);
    }
  }
};
