import { DiscordEventNames } from '../../types/EDiscordEventNames';
import { BotClient } from '../../commons/client';

export const event = {
  name: DiscordEventNames.ready,
  async execute(client: BotClient) {
    console.log(`Connected as ${client.user.tag} ${client.user.id}`);
  }
};
