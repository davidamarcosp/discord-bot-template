import { EDiscordEventNames } from '../../types/enums/EDiscordEventNames';
import { BotClient } from '../../commons/client';
import { EDiscordModuleTypes } from '../../types/enums/EDiscordModuleTypes';
import { IEventModule } from 'types/interfaces/IDiscordModules';

export const event: IEventModule = {
  name: EDiscordEventNames.ready,
  type: EDiscordModuleTypes.event,
  async execute(client: BotClient) {
    console.log(`Connected as ${client.user.tag} ${client.user.id}`);
  }
};
