/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientEvents, Interaction, ButtonInteraction, CommandInteraction } from 'discord.js';
import { BotClient } from '../../commons/client';
import { EDiscordModuleTypes } from 'types/enums/EDiscordModuleTypes';
import { IApplicationCommandAuthorization } from 'types/interfaces/IApplicationCommandAuthorization';
import { IApplicationCommandData } from 'types/interfaces/IApplicationCommandData';

export type DiscordInteractions = Interaction | ButtonInteraction | CommandInteraction;

export type InteractionExecute = (interaction: DiscordInteractions, client: BotClient) => void;

export interface DiscordModule {
  name?: string;
  type: EDiscordModuleTypes;
  execute: InteractionExecute;
}

export interface IApplicationCommandModule extends DiscordModule {
  name: string;
  isGuildCommand: boolean;
  data: IApplicationCommandData;
  authorization: IApplicationCommandAuthorization[];
}

export interface IEventModule extends DiscordModule {
  name: keyof ClientEvents;
  execute: any;
}

export interface IButtonModule extends DiscordModule {
  customId: string;
}
