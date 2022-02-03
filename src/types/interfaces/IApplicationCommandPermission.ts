import { EApplicationCommandPermissionType } from '../enums/ECommandPermissionType';

export interface IApplicationCommandPermission {
  id: string;
  type: EApplicationCommandPermissionType;
  permission: boolean;
}
