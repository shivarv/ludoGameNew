import { api, LightningElement } from 'lwc';


const CSS_DEFAULT_MAIN_DIV_CLASSES = 'main-div';
const CSS_DEFAULT_CHILD_DIV_CLASSES = 'child-div';
const CSS_INNER_CIRCLE_DIV_CLASSES = 'child-div-inner-circle child-top-left';
const COLOR_VARIANT = {'dark': 'dark', 'light': 'light'};
const BACKGROUND_TEXT = 'background';
const COLOR_TEXT = '-color-';
const CSS_POSITION_CLASSES = {'top-left': 'top-left', 'top-right': 'top-right',
                                'bottom-left': 'bottom-left', 'bottom-right': 'bottom-right'};
export default class LudoPlayerStartBox extends LightningElement {
    _color;
    mainCssClasses;
    childCssClasses;
    innerCircleTopLeftCssClasses;
    innerCircleTopRightCssClasses;
    innerCircleBottomLeftCssClasses;
    innerCircleBottomRightCssClasses;

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
        let fullCssString = BACKGROUND_TEXT+COLOR_TEXT+color;
        if(variant) {
            return fullCssString+'--'+variant;
        }
        return fullCssString;
    }

}