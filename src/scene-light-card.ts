/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    html,
    customElement,
    property,
    CSSResult,
    TemplateResult,
    query,
    state
  } from 'lit-element';
  // import {classMap} from 'lit/directives/class-map.js';
  // import {styleMap} from 'lit/directives/style-map.js';
  import { styleMap } from 'lit-html/directives/style-map.js';
import {
    HomeAssistant,
    // hasAction,
    ActionHandlerEvent,
    // handleAction,
    // LovelaceCardEditor,
    getLovelace,
    // EntityConfig,
    // LovelaceCard,
  } from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types

import { BaseCard } from './framework/BaseCard'
// import { hasConfigOrEntitiesChanged } from './framework/has-changed';
import { 
  // parseEntities, 
  // parseEntity, 
  // isIcon, 
  // createElement, 
  localize 
} from './framework/utils';
// import { filterEntity } from './framework/filterEntity' ;
import { languages } from './types';
import type { ColorConfig, ScenariosCardConfig, SceneConfig } from './types';
import { getstyles } from './styles';
import { HassEntity } from 'home-assistant-js-websocket';

import { actionHandler } from './common/action-handler-directive';

import { color_rgbww_to_rgb, color_xy_brightness_to_RGB, color_RGB_to_xy } from './util' ;

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'scene-light-card',
    name: 'Scene Light Card',
    description: 'A custom card for lights',
    preview: true
});
debugger;
@customElement('scene-light-card')
export class SceneLightCard extends BaseCard {

  @property()
  istyles = { color: 'lightgreen', fontFamily: 'Roboto' };

  @property({ attribute: false }) public hass!: HomeAssistant;
  // @internalProperty() private config!: ScenariosCardConfig;
  @state() private config!: ScenariosCardConfig;
  @query('.action') action;

  private scenarios!: SceneConfig[];
  // private actionTimeout;

    public setConfig(config: ScenariosCardConfig): void {
        if (!config) {
          throw new Error(localize( languages, 'common.invalid_configuration'));
        }
    
        if (config.test_gui) {
          getLovelace().setEditMode(true);
        }
    
        const rowSizeType = typeof config.row_size;
        let rowSize = 1;
        if (rowSizeType !== "undefined") {
          if (config.row_size < 1) {
            throw new Error("row_size must be at least 1");
          }
          if (config.row_size === "auto") {
            rowSize = config.entities.length;
          } else {
            rowSize = config.row_size;
          }
        }
    
        this.config = {
          ...config,
          color: config.color,
          // color: config.color ||
          //     readableColor(
          //         config.background,
          //         "var(--bc-heading-color-light)",
          //         "var(--bc-heading-color-dark)"
          //     ),
          rowSize: rowSize,
          //entities: (<CardEntityConfig[]>(config.entities || []).map<EntityConfig>(parseEntity)),
          // entities: parseEntities( config.scenarios || [] ) as SceneConfig[]
          entities: [config],
          a : 1
        };
    
        if( this.config.debug )
          console.log( JSON.stringify( this.config))

        this._log('config:: ' + JSON.stringify( this.config), this.config) ;
        const result = this.config.scenarios.filter(item => 
          Object.keys(item).some(k => item[k] != null && 
          item[k].toString().toLowerCase()
          .includes('tEst 1'.toLowerCase()))
          );
          this._log('find:: ' + JSON.stringify(result), this.config) ;
      }

      private getScenario( scenario: string ): SceneConfig | null {
        const sceneconfigs = this.config.scenarios.filter(item => 
          Object.keys(item).some(k => item[k] != null && 
          item[k].toString().toLowerCase()
          .includes(scenario.toLowerCase()))
          );

        if( sceneconfigs.length > 0 )
            return sceneconfigs[0] ;
        else
            return null ;
      }

      protected render(): TemplateResult | void {
        // TODO Check for stateObj or other necessary things and render a warning if missing
        if (this.config.show_warning) {
          return this._showWarning(localize(languages, 'common.show_warning'));
        }
    
        if (this.config.show_error) {
          return this._showError( localize(languages, 'common.show_error'), this.config ) ;
        }
    
        // console.log( this.hass.states[this.config.entity || ''])
        // const aaa = ({'background-color': "#333"}) ;

        // this._log( 'this.istyles :: ' + styleMap(aaa), this.config ) ;
        // <ha-card style="background: ${this.config.background};">

        const _leftColor = '#f44c09' ;
        const _width = '30px' ;
        const _height = '30px' ;
        const _leftName = 'min';
        const _leftState = true ;
        const _leftText = 'MIN';

        return html`
          <ha-card style="${styleMap(this.istyles)}">
            <!-- div id='button-container' class='box'>
              <button
                class='brightness'
                style='${_leftColor};min-width:${_width};max-width:${_width};height:${_height}'
                toggles name="${_leftName}"
                
                .disabled=${_leftState}>${_leftText}</button>
              </div-->
            ${this._renderColors( this.hass.states[this.config.entity || ''] )}
          </ha-card>
        `;
      }
      // ts-expect-error tbd
      private _renderColors( hass_entity: HassEntity ): TemplateResult {
        
        const ent_state = hass_entity.state ;
        console.log( ent_state ) ;
        // Parse new state values for _entities_
        this.scenarios = (this.config.scenarios || [])
            // .filter((conf) => filterEntity(conf, this.hass.states))
            // .map((conf) => this._parseEntity(conf));
    
            // this._log('x:' + JSON.stringify(this.config.scenarios), this.config)
        if (typeof this.scenarios == 'undefined' || this.scenarios.length === 0) {
          // this._log( 'this.scenarios == undefined', this.config ) ;
          return html``;
        }
        const s = parseFloat(this.config.size) || 32; // Circle size
        const fs = parseFloat(this.config.label_size) || 12; // Label font size        
        return html`
          <div class="scenarios-wrapper" style="margin-bottom: 0px;">
            
          ${this.scenarios.map((config: SceneConfig) => {
            this._log('[SceneConfig]:: ' + JSON.stringify(config), this.config) ;
            const backgroundcolor: string = this._getCSSColor(config.color_mode || 'none', config.color || 'none', config.brightness || 'none') ;
            // this._log('>>>' + backgroundcolor + " | " + JSON.stringify(config), this.config)
            return html`
              <div class="color" 
              @action=${ (e): void => this._handleAction(e, config.name)}
              .actionHandler=${actionHandler({
                hasHold: false,
                hasDoubleClick: false,
              })}
              >
                <div class="color-circle" style="background: ${backgroundcolor}; width: ${s}px; height: ${s}px; margin: ${s / 4}px ${s / 4}px ${s / 4}px;"></div>
                ${typeof config.name != 'undefined' && !config.hide_name ?
                    html`<div class="color-label" style="margin: ${fs / 4}px ${fs / 4}px ${s / 4}px;">${config.name}</div>` : html`` 
                }
              </div>
            ` ;
          })}
          </div>
        `;
      }

      private _handleAction(ev: ActionHandlerEvent, name: string): void {
        const scenario = this.getScenario( name ) ;
        ev.detail ;
        // console.log( '_handleAction'  + JSON.stringify(config)) ; 
        // this._log('_handleAction:: ' + JSON.stringify(ev), this.config) ;
      
        if (this.hass && this.config && scenario && scenario.action && scenario.action.type == 'call-service') {
          const service = scenario.action.service.split('.') ;
          const data = {
            entity_id: this.config.entity,
          } ;

          if(scenario.brightness)
            data['brightness'] = scenario.brightness.toString();

            switch(scenario.color_mode) {
              case 'rgbww_color':
              case 'rgbww':
                data['rgbww_color'] = [
                  scenario.color?.red, 
                  scenario.color?.green,
                  scenario.color?.blue,
                  scenario.color?.white,
                  scenario.color?.amber
                ] ;
                break ;
                case 'rgb_color':
                  case 'rgb':
                    data['rgb_color'] = [
                      scenario.color?.red, 
                      scenario.color?.green,
                      scenario.color?.blue
                    ] ;
                    break ;
            }
          
          this.hass.callService(service[0], service[1], data) ;

          // if (config.tap_action?.action === 'toggle' && !this.ctrl.isUnavailable) {
          //   this.animateActionStart();
          // }
          // handleAction(this, this.hass, {...config, entity: this.config.entity}, ev.detail.action);
        }
      }

      // private animateActionStart(): void {
      //   this.animateActionEnd();
      //   if (this.action) {
      //     this.action.classList.add('loading');
      //   }
      // }
      // private animateActionEnd(): void {
      //   if (this.action) {
      //     clearTimeout(this.actionTimeout);
      //     this.actionTimeout = setTimeout(()=> {
      //       this.action.classList.remove('loading');
      //     }, 750)
      //   }
      // }

      // private async handleClick(ev: Event): Promise<void> {
      //   const lightEntity = this.hass.states[this.config.entity || '']
      //   this._log('handleClick:: ' + JSON.stringify(ev), this.config)

      //   if(lightEntity.state == 'on' || lightEntity.state == 'off') {
      //     ev.preventDefault();
      //   }
      //   // if (this.ctrl.hasToggle && !this.ctrl.isUnavailable) {
      //   //   ev.preventDefault();
      //   //   this.animateActionStart();
      //   //   this.ctrl.log('Toggle');
      //   //   await toggleEntity(this.hass, this.config.entity);
      //   //   // this.setStateValue(this.ctrl.toggleValue);
      //   // }
      // }

      // private _handleAction(ev: ActionHandlerEvent, config): void {
      //   if (this.hass && this.config && ev.detail.action) {
      //     if (config.tap_action?.action === 'toggle' && !this.ctrl.isUnavailable) {
      //       this.animateActionStart();
      //     }
      //     handleAction(this, this.hass, {...config, entity: this.config.entity}, ev.detail.action);
      //   }
      // }

      // private _getBorderCSSColor(mode: string, color: string | number | number[]  ): string {
      //   let result = "#7F848E" ;

      //   switch( mode ) {
      //     case 'rgb_color':
      //       if( (color as number[]).length === 3 )
      //         result = `rgb(${(color as number[]).join(',')})`;
      //       break ;
      //     case 'rgbw_color':
      //       if( (color as number[]).length === 4 )
      //         result = `rgb(${(color as number[]).slice(0, 3).join(',')})`;
      //       break ;
      //     case 'rgbww_color':
      //       if( (color as number[]).length === 5 )
      //         result = `rgb(${(color as number[]).slice(0, 3).join(',')})`;
      //       break ;
      //     case 'hs_color':
      //       if( (color as number[]).length === 2 )
      //         result = `hsl(${(color as number[])[0]},100%,${100 - (color as number[])[1] / 2}%)`;
      //       break ;
      //     case 'xy_color':
      //       if( (color as number[]).length === 2 ) {
      //         const rgb: number[] = this._xyToRGB((color as number[])[0], (color as number[])[1], 255);
      //         result = `rgb(${rgb.join(',')})`;
      //       }
      //       break ;          
      //   }

      //   return( result ) ;
      // }

      // private _getColor(model: string, color: string | number | number[] | ColorConfig) {
      //   const lightEntity = this.hass.states[this.config.entity || ''] ;
      //   const result = {
      //     css : 
      //     `background-color: gray;
      //     background-image: linear-gradient(90deg, transparent 50%, rgba(255,255,255,.5) 50%);
      //     background-size: 32px 32px;`,
      //     model : model,
      //   } ;
        
      //   if(lightEntity.hasOwnProperty('attributes')) {
      //     result["model"] = lightEntity.attributes.supported_color_modes[0]
      //   }

      //   if(lightEntity.state !== 'on' && lightEntity.state !== 'off') {
      //     return result ;
      //   }
      //   switch( result["model"] ) {
      //     case 'rgbww':
      //       // let rgb = false ;
      //       // let tc = false ;
      //       const c = color as ColorConfig ;
      //       if( c.red !== undefined && c.green !== undefined && c.blue !== undefined ) {
      //         result['css'] = `rgb(${c.red}, ${c.green}, ${c.blue})` ;
      //         // rgb = true ;
      //       }
      //       // if( c.amber !== undefined && c.white !== undefined )
      //       //   tc = true ;

            
      //       // this._log('model :: ' + model + ' ' + result, this.config )
      //       break ;
      //   }

      //   return( result ) ;
      // }

      private _getCSSColor(model: string, color: string | number | number[] | ColorConfig, brightness: string | number ): string {
        const lightEntity = this.hass.states[this.config.entity || '']
        const col = color as ColorConfig;
        let result = "#7F848E" ;
        let device_brightness = null ;
        let device_model = null ;

        let RGB2xy = [0,0] ;
        let xybrightness2RGB = [0,0,0] ;

        result = `
        background-color: gray;
        background-image: linear-gradient(90deg, transparent 50%, rgba(255,255,255,.5) 50%);
        background-size: 32px 32px;     
        ` ;

        if(lightEntity.hasOwnProperty('attributes')) {
          if( lightEntity.attributes.hasOwnProperty('supported_color_modes'))
            device_model = lightEntity.attributes.supported_color_modes[0] ;
          if( lightEntity.attributes.hasOwnProperty('brightness'))
            device_brightness = lightEntity.attributes.brightness;
        }

        if(lightEntity.state !== 'on' && lightEntity.state !== 'off') {
          return result ;
        }

        // this._log('lightEntity:: ' + JSON.stringify(lightEntity), this.config)
        this._log('model :: ' + model + ' | ' + JSON.stringify(color), this.config )
        switch( model ) {
          case 'icon_color':
          case 'color_name':
            result = color as string;
            break ;
          case 'color_temp':
          case 'kelvin':
            let mireds = model == 'color_temp' ? color as number : Math.round(1000000 / (color as number)) ;

            mireds = Math.max(154, Math.min(500, mireds));
            const center = (500 + 154) / 2;
            const cr = [[166, 209, 255], [255, 255, 255], [255, 160, 0]].slice(mireds < center ? 0 : 1); // prettier-ignore
            const tr = [154, center, 500].slice(mireds < center ? 0 : 1); // Defined here: https://git.io/JvRKR
            result = `rgb(${[0, 1, 2]
                .map((i) => ((mireds - tr[0]) * (cr[1][i] - cr[0][i])) / (tr[1] - tr[0]) + cr[0][i])
                .map(Math.round)
                .join(',')})`;
            break ;
          case 'rgbw_color':
            if( (color as number[]).length === 4 )
              result = `rgb(${(color as number[]).slice(0, 3).join(',')})`;
            break ;
          case 'hs_color':
            if( (color as number[]).length === 2 )
              result = `hsl(${(color as number[])[0]},100%,${100 - (color as number[])[1] / 2}%)`;
            break ;
          case 'xy_color':
            if( (color as number[]).length === 2 ) {
              const rgb: number[] = this._xyToRGB((color as number[])[0], (color as number[])[1], 255);
              result = `rgb(${rgb.join(',')})`;
            }
            break ;
          case 'rgb_color':
          case 'rgb':
            RGB2xy = color_RGB_to_xy( <number>col.red, <number>col.green, <number>col.blue ) ;
            xybrightness2RGB = color_xy_brightness_to_RGB(RGB2xy[0], RGB2xy[1], <number>brightness || device_brightness || 0) ;
            result = `rgb(${(xybrightness2RGB as number[]).slice(0, 3).join(',')})`;
            this._log('>>> ' + device_model 
              // + ' | rgbww2rgb' +JSON.stringify(rgbww2rgb) 
              + ' | RGB2xy' + JSON.stringify(RGB2xy)
              + ' | xybrightness2RGB: ' + JSON.stringify(xybrightness2RGB), 
              this.config) ;
            break ;
          case 'rgbww_color':
          case 'rgbww':
            const rgbww2rgb = color_rgbww_to_rgb(<number>col.red,<number>col.green,<number>col.blue,<number>col.white,<number>col.amber,2000,6535) ;
            RGB2xy = color_RGB_to_xy( rgbww2rgb[0], rgbww2rgb[1], rgbww2rgb[2] ) ;
            xybrightness2RGB = color_xy_brightness_to_RGB(RGB2xy[0], RGB2xy[1], <number>brightness || device_brightness || 0) ;
            this._log('>>> ' + device_model 
              + ' | rgbww2rgb' +JSON.stringify(rgbww2rgb) 
              + ' | RGB2xy' + JSON.stringify(RGB2xy)
              + ' | xybrightness2RGB: ' + JSON.stringify(xybrightness2RGB), 
              this.config) ;
            result = `rgb(${(xybrightness2RGB as number[]).slice(0, 3).join(',')})`;
            // this._log('model :: ' + model + ' ' + result, this.config )
            break ;
        }

        return( result ) ;
      }

      // private _parseEntity(config: any): SceneConfig {
      //   const state = this.hass.states[config.entity];
      //   const attributes = state ? state.attributes : {};
    
      //   let dynamicStateData: any;
        
      //   if (config.map_state && state.state in config.map_state) {
      //     const mappedState = config.map_state[state.state];
      //     const mapStateType = typeof mappedState;
      //     if (mapStateType === "string") {
      //       dynamicStateData = {value: mappedState};
      //     } else if (mapStateType === "object") {
      //       dynamicStateData = {};
      //       Object.entries(mappedState).forEach(([key, val]) => {
      //         dynamicStateData[key] = val;
      //       });
      //     }
      //   }
    
      //   let dynamicAttrData: any;
    
      //   if (config.map_attribute && typeof config.attribute === "string" && attributes[config.attribute] in config.map_attribute) {
      //     const attrValue = attributes[config.attribute];
      //     const mappedAttr = config.map_attribute[attrValue];
      //     const mapAttrType = typeof mappedAttr;
      //     if (mapAttrType === "string") {
      //       dynamicAttrData = {value: mappedAttr};
      //     } else if (mapAttrType === "object") {
      //       dynamicAttrData = {};
      //       Object.entries(mappedAttr).forEach(([key, val]) => {
      //         dynamicAttrData[key] = val;
      //       });
      //     }
      //   }
    
      //   const data = {
      //     name: attributes.friendly_name,
      //     state: state ? state.state : "",
      //     value: typeof config.attribute === "string" &&
      //       attributes.hasOwnProperty(config.attribute) ? attributes[config.attribute] : state.state,
      //     unit: attributes.unit_of_measurement,
      //     attributes,
      //     domain: config.entity ? config.entity.split(".")[0] : undefined,
      //   };
    
      //   if (attributes.hasOwnProperty("current_position")) {
      //     data.state = attributes.current_position;
      //   }
    
      //   return {
      //     ...data,
      //     ...config,
      //     ...dynamicStateData,
      //     ...dynamicAttrData
      //   };
      // }


// /**
//  * 
//  * @param color 
//  * @returns 
//  */
// private _getCSSColorx(color: any ): string {
//         if (color['icon_color']) {
//             return color['icon_color'];
//         }
//         if (color['color_name']) {
//             return color['color_name'];
//         }
//         if (color['color_temp'] || color['kelvin']) {
//             let mireds = parseInt(color['color_temp'], 10) || Math.round(1000000 / parseInt(color['kelvin'], 10));
//             mireds = Math.max(154, Math.min(500, mireds));
//             const center = (500 + 154) / 2;
//             const cr = [[166, 209, 255], [255, 255, 255], [255, 160, 0]].slice(mireds < center ? 0 : 1); // prettier-ignore
//             const tr = [154, center, 500].slice(mireds < center ? 0 : 1); // Defined here: https://git.io/JvRKR
//             return `rgb(${[0, 1, 2]
//                 .map((i) => ((mireds - tr[0]) * (cr[1][i] - cr[0][i])) / (tr[1] - tr[0]) + cr[0][i])
//                 .map(Math.round)
//                 .join(',')})`;
//         }
//         if (Array.isArray(color['rgb_color']) && color['rgb_color'].length === 3) {
//             return `rgb(${color['rgb_color'].join(',')})`;
//         }
//         if (Array.isArray(color['rgbw_color']) && color['rgbw_color'].length === 4) {
//             return `rgb(${color['rgbw_color'].slice(0, 3).join(',')})`;
//         }
//         if (Array.isArray(color['rgbww_color']) && color['rgbww_color'].length === 5) {
//             return `rgb(${color['rgbww_color'].slice(0, 3).join(',')})`;
//         }
//         if (Array.isArray(color['hs_color']) && color['hs_color'].length === 2) {
//             return `hsl(${color['hs_color'][0]},100%,${100 - color['hs_color'][1] / 2}%)`;
//         }
//         if (Array.isArray(color['xy_color']) && color['xy_color'].length === 2) {
//             const rgb = this._xyToRGB(color['xy_color'][0], color['xy_color'][1], 255);
//             return `rgb(${rgb.join(',')})`;
//         }
//         if (color['brightness']) {
//             return `rgba(253,216,53,${color['brightness'] / 255})`;
//         }
//         if (color['brightness_pct']) {
//             return `rgba(253,216,53,${color['brightness_pct'] / 100})`;
//         }
//         return '#7F848E';
//     }

    // Original python code from Home Assistant: https://git.io/JV8ln
    private _xyToRGB(x: number, y: number, brightness: number ) {
      const Y = brightness / 255;
      const X = (Y / y) * x;
      const Z = (Y / y) * (1.0 - x - y);
      let rgb = [
          X * 1.656492 - Y * 0.354851 - Z * 0.255038,
          -X * 0.707196 + Y * 1.655397 + Z * 0.036152,
          X * 0.051713 - Y * 0.121364 + Z * 1.01153,
      ];

      rgb = rgb
          .map((c) => (c <= 0.0031308 ? 12.92 * c : (1.0 + 0.055) * Math.pow(c, 1.0 / 2.4) - 0.055)) // Apply reverse gamma correction
          .map((c) => Math.max(c, 0)); // Bring all negative components to zero

      const max = Math.max(...rgb);

      return rgb
          .map((c) => (max > 1 ? c / max : c)) // If one component is greater than 1, weight components by that value
          .map((c) => Math.floor(c * 255));
  }

  static get styles(): CSSResult {
    // const styless = getstyles() ;
    // const rules = styless.styleSheet?.cssRules ;

    // if( typeof rules != 'undefined' ) {
    //   let i;
    //   for (i = 0; i < rules.length; i++) {
    //     rules[i].parentRule?.cssText
    //     console.log( "(" + rules[i].parentRule?.cssText + ") " + rules[i].cssText ) ;
    //       }
    // } else {
    //   console.log( "rules is undefined" ) ;
    // }

    return getstyles() ;
  }
}