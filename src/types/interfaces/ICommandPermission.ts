import { CommandPermissionType } from '../enums/ECommandPermissionType';

export interface CommandPermission {
  id: string;
  type: CommandPermissionType;
  permission: boolean;
}
