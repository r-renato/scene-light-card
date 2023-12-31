import {
    LitElement,
    html,
    // customElement,
    // property,
    // CSSResult,
    TemplateResult,
    // css,
    // PropertyValues,
    // internalProperty,
    // state
  } from 'lit-element';

import {
    // HomeAssistant,
    // hasAction,
    // ActionHandlerEvent,
    // handleAction,
    // LovelaceCardEditor,
    // getLovelace,
    // EntityConfig,
    LovelaceCard,
    LovelaceCardConfig
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
import { CARD_ID } from '../const';
export class BaseCard extends LitElement {

    public static getStubConfig(): object {
        return {};
    }

    public getCardSize(): number {
        return 3;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    protected _grid(index: any = 1, config: LovelaceCardConfig) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (index === "full" || index > config.rowSize) {
            return `grid-column: span ${config.rowSize};`;
        }
        return `grid-column: span ${index};`;
    }

    /**
     * 
     * @param message 
     * @param config 
     * @param raw 
     */
    protected _log(message: any, config: LovelaceCardConfig, raw = false): void {
        if (config?.debug) {
          if (raw) {
            console.log(message);
          } else {
            console.log("[" + CARD_ID + "] " + message);
          }
        }
    }
    
    /**
     * 
     * @param warning 
     * @returns 
     */
    protected _showWarning(warning: string): TemplateResult {
        return html`
            <hui-warning>${warning}</hui-warning>
        `;
    }

    /**
     * 
     * @param error 
     * @param config 
     * @returns 
     */
    protected _showError(error: string, config: LovelaceCardConfig): TemplateResult {
        const errorCard = document.createElement('hui-error-card') as LovelaceCard ;
        errorCard.setConfig({
            type: 'error',
            error,
            origConfig: config,
        });

        return html`
            ${errorCard}
        `;
    }
}