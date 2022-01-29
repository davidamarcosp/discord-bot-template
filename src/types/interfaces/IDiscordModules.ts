/* eslint-disable no-unused-vars */
import { ClientEvents, Interaction, ButtonInteraction, CommandInteraction, Message } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { BotClient } from '../../commons/client';
import { DiscordModuleTypes } from '../enums/EDiscordModuleTypes';
import { DiscordCommandModulePermission } from './../interfaces/IDiscordCommandModulePermission';

export type DiscordInteractions = Interaction | ButtonInteraction | CommandInteraction;

interface InteractionExecute {
  (interaction: DiscordInteractions, client: BotClient);
}

export interface DiscordModule {
  name?: string;
  type: DiscordModuleTypes;
  execute: InteractionExecute;
}

export interface SlashCommandModule extends DiscordModule {
  name: any;
  isGuildCommand: boolean;
  data: SlashCommandBuilder;
  authorization: DiscordCommandModulePermission[];
}

export interface EventModule extends DiscordModule {
  name: keyof ClientEvents;
  execute: any;
}

export interface ButtonModule extends DiscordModule {
  customId: string;
}
