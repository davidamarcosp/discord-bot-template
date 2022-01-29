import { CommandPermission } from './ICommandPermission';

export interface DiscordCommandModulePermission {
  guildId?: string;
  permissions: CommandPermission[];
}
