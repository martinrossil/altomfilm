export default class AltOmFilm extends HTMLElement {
    public constructor() {
        super();
        console.log('AltOmFilm2');
    }

    async connectedCallback() {
        const { default: Module1 } = await import('./Module1');
        this.appendChild(new Module1);
        const { default: Module2 } = await import('./Module2');
        this.appendChild(new Module2);
    }
}
customElements.define('alt-om-film', AltOmFilm);