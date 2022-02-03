import {
  ButtonInteraction,
  CommandInteraction,
  Interaction,
  MessageComponentInteraction,
  SelectMenuInteraction
} from 'discord.js';
import { EDiscordEventNames } from '../../types/enums/EDiscordEventNames';
import { BotClient } from '../../commons/client';
import { EDiscordModuleTypes } from '../../types/enums/EDiscordModuleTypes';
import { IEventModule } from '../../types/interfaces/IDiscordModules';

export const event: IEventModule = {
  name: EDiscordEventNames.interactionCreate,
  type: EDiscordModuleTypes.event,
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
