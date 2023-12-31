import { 
  // ActionConfig, 
  EntityConfig, 
  // LovelaceCard, 
  LovelaceCardConfig, 
  // LovelaceCardEditor 
} from 'custom-card-helpers';
import * as en from './localize/languages/en.json';
import * as ru from './localize/languages/ru.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const languages: any = {
  en: en,
  ru: ru,
};

export interface ScenariosCardConfig extends LovelaceCardConfig, EntityConfig {
    type: string ;
    scenarios: SceneConfig[] ;

    show_warning?: boolean;
    show_error?: boolean;
    debug?: boolean;
    rowSize?: number;
    style?: string;
}
// export interface SceneConfig extends EntityConfig {
//   entity_id?: string ;
//   type?: string ;
//   label?: string ;

//   icon_color?: string ;
//   color_name?: string ;
//   color_temp?: number ;
//   kelvin?: number ;
//   rgb_color?: number[] ;
//   rgbw_color?: number[] ;
//   rgbww_color?: number[] ;
//   hs_color?: number[] ;
//   xy_color?: number[] ;
//   brightness?: number ;
//   brightness_pct?: number ;
// }

export interface SceneConfig {
  name: string ;
  hide_name?: boolean ;

  color_mode?: string ;
  color?: ColorConfig ;

  brightness?: number ;

  action?: ServiceConfig ;
}

export interface ColorConfig {
  red?: number ;
  green?: number ;
  blue?: number ;
  white?: number ;
  amber?: number ;
}

export interface ServiceConfig {
  type: string ;
  service: string ;
  data?: ServiceDataConfig ;
}

export interface ServiceDataConfig {
  entity?: string ;
  type?: string ;
  message?: string ;
}

// export interface CardEntityConfig extends EntityConfig {
//     domain: any;
//     attributes: CardAttributeConfig[];
//     error?: any;
//     toggle?: boolean;
//     tap_action?: ActionConfig;
//     hold_action?: ActionConfig;
//     double_tap_action?: ActionConfig;
//     size?: number;
//     hide_entity_name?: boolean ;
//   }

//   export interface CardAttributeConfig {
//     attribute: string;
//     measurement?: string;
//     name?: string ;
//   }