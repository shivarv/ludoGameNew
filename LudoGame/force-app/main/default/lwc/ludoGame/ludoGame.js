import { LightningElement, api, track } from 'lwc';

//this is to remove header
import HideLightningHeader from '@salesforce/resourceUrl/headerRemove';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';


//Game Rules
//Dice with number 1 can open the game
//Dice with number 6 or 1 can put again

export default class LudoGame extends LightningElement {

    playerType = 'player1';
    connectedCallback() {
        loadStyle(this, HideLightningHeader)
    }
}