import { IDiscordBotConfig } from '../types/interfaces/IDiscordBotConfig';

export const mainBotConfig: IDiscordBotConfig = {
  token: process.env.DISCORD_BOT_TOKEN,
  path: './src/main/'
};
