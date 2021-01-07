import { api, LightningElement } from 'lwc';
import {
    fireComponentEventHelper
} from 'c/ludoUtilityServices';
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

    _boardCoinPositionList;
    _arrayData = [];

    @api
    get boardCoinPositionList() {
        console.log('in get boardCoinPositionList method ');
        return this._boardCoinPositionList;
    }

    set boardCoinPositionList(value) {
        console.log('in set boardCoinPositionList method '+ JSON.stringify(value));
        this._boardCoinPositionList = value;
    }

    @api
    get arrayData() {
        console.log('in get arrayData method');
        return this._arrayData;
    }

    set arrayData(value) {
        console.log('in set arrayData method '+JSON.stringify(value));
        console.log(this._pathType + ' '+ JSON.stringify(this._boardCoinPositionList));
        this.index++;
        if(this.index === 6) {
            console.log('index error more than 6');
            console.log('boardlist is '+JSON.stringify(this._boardCoinPositionList));
            console.log('pathType '+ this._pathType);
            console.log(' this._arrayData '+ JSON.stringify(this._arrayData));
        }
        if(!this._boardCoinPositionList) {
            this.arrayData = value;
            return;
        }
        if(this.pathType === 'vertical-bottom') {
            this._arrayData = this.convertArrayWithPostion(value);
        } else {
            this._arrayData = this.sampleTestArrayWithPostion(value);
        }
    }

    sampleTestArrayWithPostion(arr) {
        console.log('in sampleTestArrayWithPostion method');
        let finalArrayData = [];
        for(let i in arr) {
            finalArrayData.push({value: arr[i], coinList: []});
        }
        return finalArrayData;
    }

    convertArrayWithPostion(arr) {
        console.log('in convertArrayWithPostion method');
        let finalArrayData = [];
        let thisBoardCoinPositionList = this.boardCoinPositionList;
        console.log('arr value is '+JSON.stringify(arr));
        console.log('thisBoardCoinPositionList value is '+JSON.stringify(thisBoardCoinPositionList));
        for(let i in arr) {
            finalArrayData.push({value: arr[i], coinList: []});
        }

        // boardCoinPositionList = [{pos: 1, coinIds : [COINOBJECTLIST[0].uniqueId], 'perspective': 'player1'}];
        for(let j in thisBoardCoinPositionList) {
            let foundValue = arr.find((ele) => {
                    return  ele.value === thisBoardCoinPositionList[j].pos;
                });
            if(foundValue) {
                for(let indCoinId in thisBoardCoinPositionList[j].coinIds) {
                    foundValue.coinList.push(thisBoardCoinPositionList[j].coinIds[indCoinId]);
                }
            }
        }
        return finalArrayData;
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