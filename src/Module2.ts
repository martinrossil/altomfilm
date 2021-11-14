import Module1 from './Module1';

export default class Module2 extends Module1 {
    public constructor() {
        super();
    }
}
customElements.define('mod-ule-two', Module2);