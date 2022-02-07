import { EApplicationCommandPermissionType } from 'types/enums/ECommandPermissionType';

export interface IApplicationCommandPermission {
  id: string;
  type: EApplicationCommandPermissionType;
  permission: boolean;
}
