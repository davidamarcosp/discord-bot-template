/* eslint-disable no-unused-vars */
import { ClientEvents, Interaction, ButtonInteraction, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { BotClient } from '../commons/client';

type DiscordInteractions = Interaction | ButtonInteraction | CommandInteraction;

interface Execute {
  (interaction: DiscordInteractions, client: BotClient);
}

export interface InteractionEvent {
  name: keyof ClientEvents;
  execute: Execute;
}

export interface ButtonEvent {
  name: string;
  execute: Execute;
}

export interface SlashCommandEvent {
  data: SlashCommandBuilder;
  execute: Execute;
}
