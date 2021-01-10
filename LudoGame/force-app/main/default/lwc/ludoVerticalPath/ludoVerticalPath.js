import { api, LightningElement } from 'lwc';
import {COIN_START_POSITION_CONST} from 'c/ludoUtilityConstant';
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

    //this arrayData must be moved to board
    @api
    get arrayData() {
        console.log('in get arrayData method');
        return this._arrayData;
    }

    set arrayData(value) {
        console.log('in set arrayData method '+JSON.stringify(value));
        //console.log(this._pathType + ' '+ JSON.stringify(this._boardCoinPositionList));
        //{name: 'coin1', position: COIN_START_POSITION_CONST, isEnd: false, 
        //isStart: false, playerType: PLAYERNAMEMAP.player1, uniqueId: ('coin1-' + PLAYERNAMEMAP.player1)},
        this._arrayData = value;
    }

    /*
    generateCoinFillerResult(arr) {
        console.log('in generateCoinFillerResult method');
        let finalArrayData = [];
        for(let i in arr) {
            finalArrayData.push({value: arr[i], coinList: []});
        }
        return finalArrayData;
    }

    convertArrayWithPostion(arr) {
        console.log('in convertArrayWithPostion method');
        let arrayObjData = this.generateCoinFillerResult(arr);
        let onlyStartedCoins = getAllPlayersStartedAndNonEndedCoins(this.boardCoinPositionList);
        console.log('arr value is '+JSON.stringify(arr));
        console.log('this.boardCoinPositionList value is '+JSON.stringify(this.boardCoinPositionList));
        if(!onlyStartedCoins || onlyStartedCoins.length === 0) {
            return arrayObjData;
        }
        // boardCoinPositionList = [{pos: 1, coinIds : [COINOBJECTLIST[0].uniqueId], 'perspective': 'player1'}];

        //loop through arrayObjData
        // get all the coins matched this position
        // add them as array to coinList attribute of arrayObjData at the loopedIndex 
        for(let loopIndex in arrayObjData) {
            let matchedCoins = onlyStartedCoins.filter((coinItem) => {
                    return  coinItem.position === arrayObjData[loopIndex].value;
                });
            //if matchedCoins filter is not empty, use this 
            if(matchedCoins.length > 0) {
                for(let indCoin of matchedCoins) {
                    arrayObjData[loopIndex].coinList.push(indCoin.coinList);
                }
            }
        }
        return arrayObjData;
    }   */

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
        console.log('in rendered callback');
    }


    elementClicked(event) {
        console.log('in elementClicked method' + event.target.dataset.key);
        this.fireSampleEvent(event.target.dataset.key);
    }



    @api
    attachClickEventListener() {
        console.log(' in attachClickEventListener ');
        this.canUserClick = true;
        this.template.querySelectorall(`[data-group="${this.divGroupName}"]`).forEach(element => {
            element.addEventListener('click', this.handleClick); //Contains HTML elements
        });
    }

    handleClick() {
        console.log('in handle click method');
        
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