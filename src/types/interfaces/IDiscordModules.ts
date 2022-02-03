/* eslint-disable no-unused-vars */
import { ClientEvents, Interaction, ButtonInteraction, CommandInteraction } from 'discord.js';
import { BotClient } from '../../commons/client';
import { EDiscordModuleTypes } from '../enums/EDiscordModuleTypes';
import { IApplicationCommandAuthorization } from './../interfaces/IApplicationCommandAuthorization';
import { IApplicationCommandData } from './IApplicationCommandData';

export type DiscordInteractions = Interaction | ButtonInteraction | CommandInteraction;

export type InteractionExecute = (interaction: DiscordInteractions, client: BotClient) => void;

export interface DiscordModule {
  name?: string;
  type: EDiscordModuleTypes;
  execute: InteractionExecute;
}

export interface IApplicationCommandModule extends DiscordModule {
  name: any;
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
