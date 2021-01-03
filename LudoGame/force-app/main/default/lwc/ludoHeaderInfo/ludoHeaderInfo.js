import { api, LightningElement } from 'lwc';
import {
    EVENTTYPESMAP
} from 'c/ludoUtilityConstant';
import {
    fireComponentEventHelper, generateRandomNumberHelper
} from 'c/ludoUtilityServices';

export default class LudoHeaderInfo extends LightningElement {
    @api currentPlayerTurn;
    @api
    userImgUrl;
    @api
    ludoImgUrl;
    @api
    loggedPlayerType;
    @api
    componentPlayerType;

    _enableClickEvent;

    @api
    get enableClickEvent() {
        console.log('in get enableClickEvent method ');
        return this._enableClickEvent;
    }

    set enableClickEvent(value) {
        console.log('in set enableClickEvent method ');
        this._enableClickEvent = value;
    }

    diceRollAction(event) {
        console.log('in diceRollAction method');
        let rolledNum = generateRandomNumberHelper();
        rolledNum = 1; //for test
        this.fireComponentEvent(rolledNum);
    }

    // {data: dataNum, firePlatformEvent: true, eventType: COMPONENTEVENTTYPESMAP.positionchangeevent}
    fireComponentEvent(data) {
        console.log('in fireComponent Event');
        let inputData = {data: data, firePlatformEvent: true, eventType: EVENTTYPESMAP.RANDOMNUMBEREVENT};
        fireComponentEventHelper(JSON.stringify(inputData), this, true, true);
    }

}