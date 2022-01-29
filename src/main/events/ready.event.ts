import { DiscordEventNames } from '../../types/enums/EDiscordEventNames';
import { BotClient } from '../../commons/client';
import { DiscordModuleTypes } from '../../types/enums/EDiscordModuleTypes';

export default {
  name: DiscordEventNames.ready,
  type: DiscordModuleTypes.event,
  async execute(client: BotClient) {
    console.log(`Connected as ${client.user.tag} ${client.user.id}`);
  }
};
