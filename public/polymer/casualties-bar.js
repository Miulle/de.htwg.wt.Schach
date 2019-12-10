import {
    LitElement,
    html
} from 'https://unpkg.com/@polymer/lit-element/lit-element.js?module';

class CasualtiesBar extends LitElement {

    static get properties() {
        return {
            pieces: {
                type: Array[String]
            }
        }
    }

    render() {
        return html `
        <style>
        </style>
        <div id="casualtiesBar">
            <span id="activePlayer">Turn: ${this.player}</span>
        </div>
        `;
    }
}
customElements.define('casualties-bar', CasualtiesBar);