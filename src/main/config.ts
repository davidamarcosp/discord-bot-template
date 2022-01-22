import { DiscordBotConfig } from '../types/IDiscordBotConfig';

export const config: DiscordBotConfig = {
  token: process.env.DISCORD_BOT_TOKEN,
  guildIds: process.env.DISCORD_GUILD_IDS,
  eventsFilesPath: './src/main/events/',
  commandsFilesPath: './src/main/commands/',
  buttonsFilesPath: './src/main/buttons/'
};
