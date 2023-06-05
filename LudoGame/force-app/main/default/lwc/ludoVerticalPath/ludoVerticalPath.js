import { api, LightningElement } from 'lwc';
import {COIN_START_POSITION_CONST} from 'c/ludoUtilityConstant';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// import pointerfontjs from '@salesforce/resourceUrl/pointerfontjs';
import {
    fireComponentEventHelper
} from 'c/ludoUtilityServices';
import {
    getAllPlayersStartedAndNonEndedCoins
} from 'c/ludoUtilityLogics';

const PATH_TYPES = {
                        'vertical-top' : 'vertical-top', 
                        'vertical-bottom' : 'vertical-bottom', 
                        'horizontal-left' : 'horizontal-left',
                        'horizontal-right' : 'horizontal-right'
                    };
const MAIN_DIV_TEXT = 'main-div';
export default class LudoVerticalPath extends LightningElement {
    index = 0;

    _pathType;
    mainDivClasses;
    _color;

    _arrayData = [];

    isRendered = false;

    //this arrayData must be moved to board
    @api
    get arrayData() {
        console.log(' in get arrayData method');
        return this._arrayData;
    }

    set arrayData(value) {
        console.log('in set arrayData method '+JSON.stringify(value));
        //console.log(this._pathType + ' '+ JSON.stringify(this._boardCoinPositionList));
        //{name: 'coin1', position: COIN_START_POSITION_CONST, hasEnded: false, 
        //hasStarted: false, playerType: PLAYERNAMEMAP.player1, uniqueId: ('coin1-' + PLAYERNAMEMAP.player1)},
        this._arrayData = value;
    }

    @api
    get pathType() {
        console.log(' in get pathType method');
        return this._pathType;
    }

    set pathType(value) {
        console.log(' in set pathType method'+ value);
        this._pathType = value;
        this.assignMainDivClasses();
    }

    @api
    get Color() {
        console.log(' in get color method');
        return this._color;
    }

    set Color(value) {
        console.log(' in set color method'+ value);
        this._color = value;
    }


    assignMainDivClasses() {
        console.log(' in assignMainDivClasses method');
        if(this._pathType === PATH_TYPES['vertical-top'] || this._pathType === PATH_TYPES['vertical-bottom']) {
            this.mainDivClasses = MAIN_DIV_TEXT + '-'+ 'vertical';
        } else if(this._pathType === PATH_TYPES['horizontal-left'] || this._pathType === PATH_TYPES['horizontal-right']) {
            this.mainDivClasses = MAIN_DIV_TEXT + '-'+ 'horizontal';
        }
        console.log(' this.mainDivClasses '+this.mainDivClasses);
    }

    renderedCallback() {
        console.log('in rendered callback ');
        if (this.isRendered) {
            return;
        }
        this.isRendered = true;
        this.loadFiles();
    }

    loadFiles() {
        console.log('in loadFiles method')
        /*
        Promise.all([
           loadScript(this, pointerfontjs)
        ]).then(() => {
                console.log(' pointerfontjs loaded ');
            })
            .catch(error => {
                console.log(' pointerfontjs error '+ error);
        }); */
    }


    elementClicked(event) {
        console.log('in elementClicked method' + event.target.dataset.key);
        this.fireSampleEvent(event.target.dataset.key);
    }



    @api
    attachClickEventListener() {
        console.log(' in attachClickEventListener method');
        this.canUserClick = true;
        this.template.querySelectorall(`[data-group="${this.divGroupName}"]`).forEach(element => {
            element.addEventListener('click', this.handleClick); //Contains HTML elements
        });
    }

    handleClick(event) {
        console.log('in handle click method');
        //let dataObject;
        //this.fireComponentEvent();
    }


    fireComponentEvent(dataObject) {
        console.log('in fireComponentEvent method ');
        // {data: dataNum, firePlatformEvent: true, eventType: COMPONENTEVENTTYPESMAP.positionchangeevent}
        let inputData = {data: dataObject, firePlatformEvent: true, eventType: EVENTTYPESMAP.COINCLICKEDEVENT};
        fireComponentEventHelper(JSON.stringify(inputData), this, false, false);
    }

    removeClickEventListener() {
        console.log(' in removeClickEventListener method');
        this.template.querySelectorall(`[data-group="${this.divGroupName}"]`).forEach(element => {
            element.removeEventListener('click', this.handleClick); //Contains HTML elements
        });
    }
    
    fireSampleEvent(inputVal) {
        console.log('in fireSampleEvent');
        let inputData = {data: inputVal, firePlatformEvent: true, eventType: 'testevent'};
        fireComponentEventHelper(JSON.stringify(inputData), this, true, true);
    }
}