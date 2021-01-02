import { LightningElement, track, api } from 'lwc';
import {
    PLAYER_TYPES, PLAYER_CALC_UNIQUE_VALUE, PLAYER_CALC_HOME_ARRAY_INDEXES,
    CALC_EQUALIZER_UNIQUE_VALUE, OTHER_PLAYER_HOME_RUN_FROM_PLAYER1_PERSPECTIVE
} from 'c/ludoUtilityConstant';
import {
    convertPositionFromPlayer1Perspective
} from 'c/ludoUtilityServices';
import LUDO_RESOURCE from '@salesforce/resourceUrl/ludo';

export default class LudoBoard extends LightningElement {
   
    _playerType;
    _playerUniqueValue;

    ludoIconImgUrl = LUDO_RESOURCE + '/ludo/images/ludoIcon.png';
    user1ImgUrl = LUDO_RESOURCE + '/ludo/images/user1.jpg';
    user2ImgUrl = LUDO_RESOURCE + '/ludo/images/user2.jpg';
    user3ImgUrl = LUDO_RESOURCE + '/ludo/images/user3.png';
    user4ImgUrl = LUDO_RESOURCE + '/ludo/images/user4.png';

    colorRed = 'red';
    colorGreen = 'green';
    colorBlue = 'blue';
    colorYellow = 'yellow';
    
    verticalTopPathType = 'vertical-top';
    verticalBottomPathType = 'vertical-bottom';

    horizontalLeftPathType = 'horizontal-left';
    horizontalRightPathType = 'horizontal-right';

    verticalTopArray;
    verticalBottomArray;
    horizontalLeftArray;
    horizontalRightArray;

    @api
    get playerType() {
        console.log('in get playerType method');
    }
    set playerType(value) {
        console.log('in set playerType method');
        this._playerType = value;
        this.assignPlayerUniqueValue();
        this.assignPathDataArrayValues();
    }

    assignPlayerUniqueValue() {
        console.log('in assignPlayerUniqueValue method ');
        this._playerUniqueValue = PLAYER_CALC_UNIQUE_VALUE[this._playerType];
    }

    assignPathDataArrayValues() {
        console.log('in assignPathDataArrayValues method');
        //player 1 is default and is blue
        //player 2 is red
        //player 3 is green
        //player 4 is yellow
        this.configureDefaultArrayValues();
        this.subtractUniqueValueFromArray();
        this.equaliseWrongValuesForArray();
        this.assignHomeValuesForArray();
        this.fillZeroByNegativeNumbers();

        console.log('player 1 ' + this.verticalBottomArray);
        console.log('player 2 ' + this.horizontalLeftArray);
        console.log('player 3 ' + this.verticalTopArray);
        console.log('player 4 ' + this.horizontalRightArray);

    }

    getPlayerStartBoxArray() {
        console.log('in getPlayerStartBoxArray method');
        let arr;
        if(this._playerType === PLAYER_TYPES['player1']) {
            arr = this.verticalBottomArray;
        } else if(this._playerType === PLAYER_TYPES['player2']) {
            arr = this.horizontalLeftArray;
        } else if(this._playerType === PLAYER_TYPES['player3']) {
            arr = this.verticalTopArray;
        } else if(this._playerType === PLAYER_TYPES['player4']) {
            arr = this.horizontalRightArray;
        }
        return arr;
    }
    
    // this will only set the home run for the current player
    assignHomeValuesForArray() {
        console.log('in assignHomeValuesForArray method');
        // get the actual home box array
        let arr = this.getPlayerStartBoxArray();
        let initialVal = 0;
        //this gives the array indexes of home number
        let homeArrayIndexes = PLAYER_CALC_HOME_ARRAY_INDEXES[this._playerType];
        console.log(arr);
        console.log(homeArrayIndexes);
        //basically loop through the home box for the home indexes and assign equaliser values
        for(let index of homeArrayIndexes) {
            arr[index] = CALC_EQUALIZER_UNIQUE_VALUE + initialVal;
            initialVal++;
        }
          
    }

    equaliseWrongValuesForArray() {
        console.log('in equaliseWrongValuesForArray method');
        this.individualEqualiseWrongValueHelper(this.verticalBottomArray);
        this.individualEqualiseWrongValueHelper(this.verticalTopArray);
        this.individualEqualiseWrongValueHelper(this.horizontalLeftArray);
        this.individualEqualiseWrongValueHelper(this.horizontalRightArray);
    }

    individualEqualiseWrongValueHelper(array) {
        console.log('in individualEqualiseWrongValueHelper method');
        let negativeUniqueValue = -this._playerUniqueValue;
        for(let index in array) {
            if(array[index] < 0 && array[index] > negativeUniqueValue) {
                array[index] = array[index] + CALC_EQUALIZER_UNIQUE_VALUE;
            }
        }
    }
    
    subtractUniqueValueFromArray() {
        console.log('in subtractUniqueValueFromArray method');
        this.individualArraySubtractionHelper(this.verticalBottomArray);
        this.individualArraySubtractionHelper(this.verticalTopArray);
        this.individualArraySubtractionHelper(this.horizontalLeftArray);
        this.individualArraySubtractionHelper(this.horizontalRightArray);
    }

    individualArraySubtractionHelper(array) {
        console.log(' in individualArraySubtractionHelper method');
        for(let index in array) {
            if(array[index] !== 0) {
                array[index] = array[index] - this._playerUniqueValue;
            }
        }
    }

    configureDefaultArrayValues() {
        console.log('in configureDefaultArrayValues method ');
        //fill for player1 verticalBottomArray fully, else it creates issue
        this.verticalBottomArray = [6, 57, 46, 5, 56, 47, 4, 55, 48, 3, 54, 49, 2, 53, 50, 1, 52, 51];
        this.verticalTopArray = [25, 26, 27, 24, 0, 28, 23, 0, 29, 22, 0, 30, 21, 0, 31, 20, 0, 32];
        this.horizontalLeftArray = [14, 15, 16, 17, 18, 19, 13, 0, 0, 0, 0, 0, 12, 11, 10, 9, 8, 7];
        this.horizontalRightArray = [33, 34, 35, 36, 37, 38, 0, 0, 0, 0, 0, 39, 45, 44, 43, 42, 41, 40];
    }


    // this is needed because key needs to be unique
    fillZeroByNegativeNumbers() {
        let initNumberObj = {value: -100};
        console.log('in fillZeroByNegativeNumbers method');
        this.individualArrayFill(this.verticalBottomArray, initNumberObj);
        this.individualArrayFill(this.verticalTopArray, initNumberObj);
        this.individualArrayFill(this.horizontalLeftArray, initNumberObj);
        this.individualArrayFill(this.horizontalRightArray, initNumberObj);

    }

    individualArrayFill(array, valObj) {
        console.log(' in individualArrayFill method');
        for(let index in array) {
            if(array[index] === 0) {
                array[index] = valObj.value;
                valObj.value = valObj.value - 1;
            }
        }
    }

    testPlayerValues(event) {
        console.log('in testPlayerValues method ');
        if(this._playerType === 'player1') {
            this.playerType = 'player2';
        } else if(this._playerType === 'player2') {
            this.playerType = 'player3';
        } else if(this._playerType === 'player3') {
            this.playerType = 'player4';
        } else if(this._playerType === 'player4') {
            this.playerType = 'player1';
        }
    }


}