import { LightningElement, api, track } from 'lwc';

//this is to remove header
import HideLightningHeader from '@salesforce/resourceUrl/headerRemove';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class LudoGame extends LightningElement {
    connectedCallback() {
        loadStyle(this, HideLightningHeader)
    }
}