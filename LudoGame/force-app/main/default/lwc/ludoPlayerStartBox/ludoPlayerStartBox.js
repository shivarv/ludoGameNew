import { api, LightningElement } from 'lwc';
import {
    EVENTTYPESMAP
} from 'c/ludoUtilityConstant';
import {
    fireComponentEventHelper, generateCoinUniqueId
} from 'c/ludoUtilityServices';

const CSS_DEFAULT_MAIN_DIV_CLASSES = 'main-div';
const CSS_DEFAULT_CHILD_DIV_CLASSES = 'child-div';
const CSS_INNER_CIRCLE_DIV_CLASSES = 'child-div-inner-circle child-top-left';
const COLOR_VARIANT = {'dark': 'dark', 'light': 'light'};
const BACKGROUND_TEXT = 'background';
const COLOR_TEXT = '-color-';
const CSS_POSITION_CLASSES = {'top-left': 'top-left', 'top-right': 'top-right',
                                'bottom-left': 'bottom-left', 'bottom-right': 'bottom-right'};
const MAXPOINTINBOX = 4;
const MINPOINTINBOX = 0;
export default class LudoPlayerStartBox extends LightningElement {
    _color;
    mainCssClasses;
    childCssClasses;
    innerCircleTopLeftCssClasses;
    innerCircleTopRightCssClasses;
    innerCircleBottomLeftCssClasses;
    innerCircleBottomRightCssClasses;
    canUserClick = false;
    divGroupName = 'circleDiv';
    countPointInBox = 4;

    isTest = true;

    @api componentPlayerType;

    get canShow4() {
        return this.isTest || this.countPointInBox > 3;
    }

    get canShow3() {
        return  this.isTest ||  this.countPointInBox > 2;
    }

    get canShow2() {
        return  this.isTest ||  this.countPointInBox > 1;
    }

    get canShow1() {
        return  this.isTest ||  this.countPointInBox > 0;
    }

    

    @api
    get color() {
        console.log(' in get Color method');
        return this._color;
    }

    set color(value) {
        console.log(' in set Color method');
        this._color = value;
        this.setStyleClasses();
    }

    setStyleClasses() {
        console.log(' in setStyleClasses method');
        this.setMainCssClasses();
        this.setChildCssClasses();
        this.setInnerCircleCssClasses();
    }

    setMainCssClasses() {
        console.log(' in setMainCssClasses method');
        this.mainCssClasses = CSS_DEFAULT_MAIN_DIV_CLASSES + ' '+ this.getBackgroundColorHelper(this._color, COLOR_VARIANT.light);
    }

    setChildCssClasses() {
        console.log(' in setChildCssClasses method');
        this.childCssClasses = CSS_DEFAULT_CHILD_DIV_CLASSES + ' '+ this.getBackgroundColorHelper(this._color, null);
    }

    setInnerCircleCssClasses() {
        console.log(' in setInnerCircleCssClasses method');
        let preCssClasses = CSS_INNER_CIRCLE_DIV_CLASSES + ' '+ this.getBackgroundColorHelper(this._color, COLOR_VARIANT.dark);
        //cant access CSS_POSITION_CLASSES.top-left, dono why
        this.innerCircleTopLeftCssClasses = preCssClasses + ' '+CSS_POSITION_CLASSES['top-left'];
        this.innerCircleTopRightCssClasses = preCssClasses + ' '+CSS_POSITION_CLASSES['top-right'];
        this.innerCircleBottomLeftCssClasses = preCssClasses + ' '+CSS_POSITION_CLASSES['bottom-left'];
        this.innerCircleBottomRightCssClasses = preCssClasses + ' '+CSS_POSITION_CLASSES['bottom-right'];   
    }


    getBackgroundColorHelper(color, variant) {
        console.log(' in getBackgroundColorHelper method');
        let fullCssString = BACKGROUND_TEXT+COLOR_TEXT+color;
        if(variant) {
            return fullCssString+'--'+variant;
        }
        return fullCssString;
    }

    @api
    decrementCountIndex() {
        console.log(' in decrementCountIndex method');

        if(this.countPointInBox === MINPOINTINBOX) {
            return;
        }
        this.countPointInBox--;
    }

    @api
    incrementCountIndex() {
        console.log(' in incrementCountIndex method');
        if(this.countPointInBox === MAXPOINTINBOX) {
            return;
        }
        this.countPointInBox++;
    }

    @api
    attachClickEventListener() {
        console.log(' in attachClickEventListener ');
        this.canUserClick = true;
        let that = this; // need since it is an arrow method
        this.template.querySelectorAll(`[data-group="${this.divGroupName}"]`).forEach(element => {
            //since handleClick is inside the => function, i use bind
            element.addEventListener('click', that.handleClick.bind(that)); //Contains HTML elements
        });
    }

    handleClick(event) {
        console.log('in handle click method');
        if(!this.canUserClick) {
            return;
        }
        this.canUserClick = false;
        this.decrementCountIndex();
        let coinIdInput = generateCoinUniqueId(this.countPointInBox, this.componentPlayerType);
        let dataObject = {positionFrom: -1, positionTo: 1, hasStarted: true,
                            coinId: coinIdInput, isHome: false};
        this.fireComponentEvent(dataObject, EVENTTYPESMAP.COINCLICKEDEVENT);
        this.removeClickEventListener();
    }

    fireComponentEvent(dataObject, eventType) {
        console.log('in fireComponentEvent method ');
        // {data: dataNum, firePlatformEvent: true, eventType: COMPONENTEVENTTYPESMAP.positionchangeevent}
        let inputData = {data: dataObject, firePlatformEvent: true, eventType: eventType};
        fireComponentEventHelper(JSON.stringify(inputData), this, false, false);
    }

    removeClickEventListener() {
        console.log(' in removeClickEventListener method');
        this.template.querySelectorAll(`[data-group="${this.divGroupName}"]`).forEach(element => {
            element.removeEventListener('click', this.handleClick); //Contains HTML elements
        });
    }

}