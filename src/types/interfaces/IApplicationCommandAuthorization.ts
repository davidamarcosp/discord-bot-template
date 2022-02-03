import { IApplicationCommandPermission } from './IApplicationCommandPermission';

export interface IApplicationCommandAuthorization {
  guildId?: string;
  permissions: IApplicationCommandPermission[];
}
