import { LightningElement,api, track } from 'lwc';

export default class TestParent extends LightningElement {

    @track
    testValues;

    _val;

    constructor() {
        super();
        this.testValues = [];
        let coinList1 = [11, 12 , 13, 14];
        let coinList2 = [21, 22 , 23, 24];

        this.testValues.push({value: 1, coinList: coinList1});
        this.testValues.push({value: 2, coinList: coinList2});
        this.testValuesObj = this.testValues;
    }


    changeValue(event) {
        this.testValues[0].coinList[2] = this.testValues[0].coinList[2] + 1;
        console.log(JSON.stringify(this.testValues));
        this.testValuesObj = this.testValues;

    }

    get testValuesObj() {
        console.log('in getter of testValuesObj ' );
        return this._val;
    }

    set testValuesObj(val) {
        console.log('in setter of testValuesObj ' );

        this._val = val;
    }
}