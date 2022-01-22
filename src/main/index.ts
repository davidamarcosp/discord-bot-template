import { client } from '../commons/client';
import { config } from './config';

export const mainBot = async () => {
  try {
    const { token, guildIds, eventsFilesPath, commandsFilesPath, buttonsFilesPath } = config;
    await client.start(token, guildIds, {
      events: eventsFilesPath,
      commands: commandsFilesPath,
      buttons: buttonsFilesPath
    });
  } catch (error) {
    console.error(error);
  }
};
