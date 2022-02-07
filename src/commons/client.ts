import { REST } from '@discordjs/rest';
import { join } from 'path';
import { Routes } from 'discord-api-types/v9';
import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import * as Modules from '../types/interfaces/IDiscordModules';
import { IApplicationCommandData } from 'types/interfaces/IApplicationCommandData';

export class BotClient extends Client {
  public commands: Collection<string, Modules.IApplicationCommandModule> = new Collection();

  public events: Collection<string, Modules.IEventModule> = new Collection();

  public buttons: Collection<string, Modules.IButtonModule> = new Collection();

  private discordAPI: REST;

  constructor(intents: number[]) {
    super({ intents });
  }

  async start(token: string, path: string) {
    await this.login(token);
    await this.loadModules(path);
    await this.registerCommands();
  }

  private async loadModules(path: string): Promise<void> {
    this.discordAPI = new REST({ version: '9' }).setToken(this.token);
    const modules = readdirSync(path.endsWith('/') ? path : path + '/', { withFileTypes: true })
      .filter((file) => file.isDirectory())
      .flatMap((folder) => readdirSync(path + folder.name).map((file) => path + folder.name + '/' + file))
      .filter((file) => file.includes('.command') || file.includes('.event') || file.includes('.button'))
      .map((m) => this.registerModule(m));

    await Promise.all(modules);
  }

  private async registerModule(modulePath: string) {
    const importedModule = await import(join(process.cwd(), modulePath));
    const keys = Object.keys(importedModule);

    if (keys.length === 1) {
      const discordModule = importedModule[keys[0]];

      if (isSlashCommandModule(discordModule)) {
        this.commands.set(discordModule.name, discordModule);
      }

      if (isEventModule(discordModule)) {
        this.events.set(discordModule.name, discordModule);
        this.on(discordModule.name, (...args) => discordModule.execute(...args, this));
      }

      if (isButtonModule(discordModule)) {
        this.buttons.set(discordModule.customId, discordModule);
      }
    }
  }

  private async registerCommands(): Promise<void> {
    this.guilds.cache.map(async (guild) => {
      const commands = this.getGuildCommands(guild.id);

      if (commands.length > 0) {
        const updatedCommands = await this.updateGuildSlashCommands(
          commands.map((command) => command.data),
          guild.id
        );

        const commandsWithPermissions = this.getGuildUpdatedCommandsPermissions(commands, updatedCommands);

        const updatedCommandsWithPermissions = await this.updateGuildSlashCommandsPermissions(
          commandsWithPermissions,
          guild.id
        );

        if (process.env.ENVIRONMENT === 'dev') {
          console.log(
            `Updated commands for guild: ${guild.id} name: ${guild.name} `,
            commandsWithPermissions,
            updatedCommandsWithPermissions
          );
        }
      }
    });

    // TODO - Register global commands
  }

  private async updateGuildSlashCommands(commands: IApplicationCommandData[], guildId: string): Promise<any> {
    return await this.discordAPI.put(Routes.applicationGuildCommands(this.application.id, guildId), {
      body: commands
    });
  }

  private async updateGuildSlashCommandsPermissions(commands: any, guildId: string): Promise<any> {
    return await this.discordAPI.put(Routes.guildApplicationCommandsPermissions(this.application.id, guildId), {
      body: commands
    });
  }

  private getGuildCommands(guildId: string) {
    return this.commands
      .map((command) => command)
      .filter((command) => command.authorization.find((p) => p?.guildId === guildId))
      .map((command) => {
        return { data: command.data, authorization: command.authorization.find((p) => p?.guildId === guildId) };
      });
  }

  private getGuildUpdatedCommandsPermissions(commands, updatedCommands) {
    return updatedCommands.map((command) => {
      const commandFound = commands.find((c) => c.data.name === command.name);
      return { id: command.id, permissions: commandFound.authorization.permissions };
    });
  }
}

const isSlashCommandModule = (object: any): object is Modules.IApplicationCommandModule => {
  return (
    (object as Modules.IApplicationCommandModule).name !== undefined &&
    (object as Modules.IApplicationCommandModule).type !== undefined &&
    (object as Modules.IApplicationCommandModule).data !== undefined &&
    (object as Modules.IApplicationCommandModule).execute !== undefined
  );
};

const isEventModule = (object: any): object is Modules.IEventModule => {
  return (
    (object as Modules.IEventModule).name !== undefined &&
    (object as Modules.IEventModule).type !== undefined &&
    (object as Modules.IEventModule).execute !== undefined
  );
};

const isButtonModule = (object: any): object is Modules.IButtonModule => {
  return (
    (object as Modules.IButtonModule).customId !== undefined &&
    (object as Modules.IButtonModule).type !== undefined &&
    (object as Modules.IButtonModule).execute !== undefined
  );
};
