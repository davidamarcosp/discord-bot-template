/* eslint-disable camelcase */
import { EApplicationCommandTypes } from '../enums/EApplicationCommandTypes';
import { EApplicationCommandOptionTypes } from '../enums/EApplicationCommandOptionTypes';
import { EApplicationCommandOptionChannelTypes } from '../enums/EApplicationCommandOptionChannelTypes';

interface IApplicationCommandOptionChoice {
  name: string;
  value: string | number;
}

interface IApplicationCommandOption {
  type: EApplicationCommandOptionTypes;
  name: string;
  description: string;
  required?: boolean;
  choices?: IApplicationCommandOptionChoice[];
  options?: IApplicationCommandOption[];
  channel_types?: EApplicationCommandOptionChannelTypes;
  min_value?: number;
  max_value?: number;
  autocomplete?: boolean;
}

export interface IApplicationCommandData {
  name: string;
  description: string;
  default_permission?: boolean;
  type?: EApplicationCommandTypes;
  options?: IApplicationCommandOption[];
}
