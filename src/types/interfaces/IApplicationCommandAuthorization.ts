import { IApplicationCommandPermission } from 'types/interfaces/IApplicationCommandPermission';

export interface IApplicationCommandAuthorization {
  guildId?: string;
  permissions: IApplicationCommandPermission[];
}
