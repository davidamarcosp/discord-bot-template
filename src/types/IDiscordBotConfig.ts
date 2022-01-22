export interface DiscordBotConfig {
  token: string;
  guildIds?: string;
  eventsFilesPath: string;
  commandsFilesPath?: string;
  buttonsFilesPath?: string;
}
