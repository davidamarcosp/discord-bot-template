import { Intents } from 'discord.js';
import { BotClient } from '../commons/client';
import { mainBotConfig } from './config';
/* Add the required Intents for your bot application, for more information --> https://discord.com/developers/docs/topics/gateway#list-of-intents */
const { GUILDS, GUILD_MEMBERS, GUILD_MESSAGES, GUILD_PRESENCES } = Intents.FLAGS;
const intents = [GUILDS, GUILD_MEMBERS, GUILD_MESSAGES, GUILD_PRESENCES];

export const mainBotClient = new BotClient(intents);

export const mainBot = async () => {
  try {
    await mainBotClient.start(mainBotConfig.token, mainBotConfig.path);
  } catch (error) {
    console.error(error);
  }
};
