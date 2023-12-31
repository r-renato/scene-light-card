import {
  HomeAssistant,
  EntityConfig,
  // hasAction,
  // ActionHandlerEvent,
  // handleAction,
  // LovelaceCardEditor,
  // getLovelace,
} from 'custom-card-helpers';
// import type {  SceneConfig } from '../types';

const ICON_REGEXP = /^(mdi|hass):/;
export function isIcon(value: any) {
  return typeof value === "string" && value.match(ICON_REGEXP);
}

export function mapObject(data: any, fn: any): any {
  return Object.entries(data).reduce((result, [key, value]) => {
    return {
      ...result,
      [key]: fn(value, key)
    };
  }, {});
}

/**
 * 
 * @param entity 
 * @returns 
 */

// export function parseScenes(scenes: SceneConfig[]): EntityConfig[] {
//   return scenes.map<SceneConfig>(parseEntity)
//  }

 export function parseEntities(entities: EntityConfig[]): EntityConfig[] {
  return entities.map<EntityConfig>(parseEntity)
 }

 export function parseEntity(entity: EntityConfig): EntityConfig {
  if (typeof entity === "object") {
    return mapObject(entity, (value: any) => {
      return value === false ? null : value;
    });
  }
  return { entity };
}

export function createElement(tag: any, config: any, hass: HomeAssistant) {
  const element = document.createElement(tag);

  if (element.setConfig) {
    element.setConfig(config);
  }

  element.hass = hass;

  return element;
}

// export function readableColor(hex: string | string[] | [any, any, any], light: string, dark: string) {
//   if (!hex || hex[0] !== "#") {
//     return dark;
//   }
//   hex = hex.substring(1);

//   // convert 3-digit hex to 6-digits.
//   if (hex.length === 3) {
//     const [a, b, c] = hex;
//     hex = [a, a, b, b, c, c].join("");
//   }
//   if (hex.length !== 6) {
//     return dark;
//   }

//   const rgb = [
//     parseInt(hex.slice(0, 2), 16) / 255,
//     parseInt(hex.slice(2, 4), 16) / 255,
//     parseInt(hex.slice(4, 6), 16) / 255
//   ];

//   const [r, g, b] = rgb.map(c => {
//     if (c <= 0.03928) {
//       return c / 12.92;
//     } else {
//       return Math.pow((c + 0.055) / 1.055, 2.4);
//     }
//   });

//   return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179 ? dark : light;
// }

export function localize(languages : any, string: string, search = '', replace = ''): string {
  const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');

  let translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}