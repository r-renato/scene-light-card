import {
    CSSResult,
    css
  } from 'lit-element';
  
// https://lit-element.polymer-project.org/guide/styles
export function getstyles(): CSSResult {
    return css`
  :host {
    --bc-font-size-heading: var(--banner-card-heading-size, 3em);
    --bc-font-size-heading-mini: var(--banner-card-heading-size-mini, 2.3em);
    --bc-font-size-entity-value: var(--banner-card-entity-value-size, 1.1em);
    --bc-font-size-attribute-value: var(--banner-card-entity-value-size, 1.0em);
    --bc-font-size-attribute-name: var(--banner-card-entity-value-size, 0.7em);
    --bc-font-size-media-title: var(--banner-card-media-title-size, 0.9em);
    --bc-margin-heading: var(--banner-card-heading-margin, 1em);
    --bc-margin-heading-mini: var(--banner-card-heading--mini, 0.6em);
    --bc-spacing: var(--banner-card-spacing, 4px);
    --bc-button-size: var(--banner-card-button-size, 32px);
    --bc-heading-color-dark: var( --banner-card-heading-color-dark, var(--primary-text-color) );
    --bc-heading-color-light: var(--banner-card-heading-color-light, #fff);
  }

  ha-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto !important;
  }

  a { cursor: pointer; }

  .scenarios-wrapper { cursor: auto; display: flex; flex-wrap: wrap; }
  .color { flex-basis: 0px; }
  .color-circle {
      border-radius: 50%; cursor: pointer; transition: box-shadow 0.15s ease-in-out;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .color-circle:hover {
      box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)
  }
  .color-label {
      color: var(--primary-text-color);
      text-align: center;
      overflow-wrap: anywhere;
  }

  .box {
    display: flex;
    flex-direction: row;
  }

  .brightness {
    margin-left: 2px;
    margin-right: 2px;
    background-color: #759aaa;
    border: 1px solid lightgrey; 
    border-radius: 4px;
    font-size: 10px !important;
    color: inherit;
    text-align: center;
    float: left !important;
    padding: 1px;
    cursor: pointer;
  }
  `;
}
