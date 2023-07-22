import {JSDOM} from "jsdom";

declare global {
    /*eslint-disable*/
    export var document: Document;
}
if (!global.document) {
    global.document = new JSDOM().window.document;
}