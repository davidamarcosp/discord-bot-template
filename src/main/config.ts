import { DiscordBotConfig } from '../types/interfaces/IDiscordBotConfig';

export const mainBotConfig: DiscordBotConfig = {
  token: process.env.DISCORD_BOT_TOKEN,
  path: './src/main/'
};
