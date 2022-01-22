import { REST } from '@discordjs/rest';
import { join } from 'path';
import { Routes } from 'discord-api-types/v9';
import { Client, Intents, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import * as Events from 'types/IDiscordEvents';

/* Add the required Intents for your bot application, for more information --> https://discord.com/developers/docs/topics/gateway#list-of-intents */
const { GUILDS, GUILD_MEMBERS, GUILD_MESSAGES, GUILD_PRESENCES } = Intents.FLAGS;

const intents = [GUILDS, GUILD_MEMBERS, GUILD_MESSAGES, GUILD_PRESENCES];

export class BotClient extends Client {
  public commands: Collection<string, Events.SlashCommandEvent> = new Collection();

  public events: Collection<string, Events.InteractionEvent> = new Collection();

  public buttons: Collection<string, Events.ButtonEvent> = new Collection();

  private discordAPI: REST;

  constructor() {
    super({ intents });
  }

  async start(token: string, guildIds: string, paths: { events: string; commands: string; buttons: string }) {
    this.discordAPI = new REST({ version: '9' }).setToken(token);
    await this.login(token);
    await this.registerModules(paths);
    await this.updateCommands(guildIds);
  }

  private async registerModules({ events, commands, buttons }): Promise<void> {
    const eventFiles: string[] = readdirSync(events);
    const commandFiles: string[] = readdirSync(commands);
    const buttonFiles: string[] = readdirSync(buttons);

    // Load events and attach them to a discord client.
    for (const filePath of eventFiles) {
      const { event } = await import(join(process.cwd(), events, filePath));

      if (event?.name) {
        this.events.set(event.name, event);
        this.on(event.name, (...args) => event.execute(...args, this));
      }
    }

    // Load commands and attach them to a discord client
    for (const filePath of commandFiles) {
      const { command } = await import(join(process.cwd(), commands, filePath));

      if (command?.data?.name) {
        this.commands.set(command.data.name, command);
      }
    }

    // Load buttons and attach them to a discord client
    for (const filePath of buttonFiles) {
      const { button } = await import(join(process.cwd(), buttons, filePath));

      if (button?.customId) {
        this.buttons.set(button.customId, button);
      }
    }
  }

  private async updateCommands(guildIds: string): Promise<void> {
    if (guildIds) {
      const guilds = guildIds.split(',');

      for (const guildId of guilds) {
        await this.discordAPI.put(Routes.applicationGuildCommands(this.application.id, guildId), {
          body: this.commands.map((command) => command.data.toJSON())
        });
      }
    }

    // Registering global commands
    await this.discordAPI.put(Routes.applicationCommands(this.application.id), {
      body: this.commands.map((command) => command.data.toJSON())
    });
  }
}

export const client: BotClient = new BotClient();
