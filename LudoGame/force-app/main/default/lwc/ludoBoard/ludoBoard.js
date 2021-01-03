import { LightningElement, track, api } from 'lwc';
import {
    PLAYER_TYPES, PLAYER_CALC_UNIQUE_VALUE, PLAYER_HOME_ARRAY_INDEXES,
    CALC_EQUALIZER_UNIQUE_VALUE, OTHER_PLAYER_HOME_RUN_FROM_PLAYER1_PERSPECTIVE,
    EVENTTYPESMAP, MAX_VALUE_FOR_HOME, START_BOX, MIDDLE_PATH_BOX,
    COINOBJECTLIST
} from 'c/ludoUtilityConstant';
import {
    convertPositionFromPlayer1Perspective, convertPositionToPlayer1Perspective,
    generateRandomNumberHelper, fireComponentEventHelper
} from 'c/ludoUtilityServices';
import LUDO_RESOURCE from '@salesforce/resourceUrl/ludo';

export default class LudoBoard extends LightningElement {
    player1 = PLAYER_TYPES['player1'];
    player2 = PLAYER_TYPES['player2'];
    player3 = PLAYER_TYPES['player3'];
    player4 = PLAYER_TYPES['player4'];
    diceMoveVal;
    canPlayerClickCoin;

    testPlayerChange = 'player2';
    @track
    coinObjectList = COINOBJECTLIST;
    currentPlayerTurn;
    _playerType;
    _playerUniqueValue;

    ludoImgUrl = LUDO_RESOURCE + '/ludo/images/ludoIcon.png';
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

    //Layer where the whole game starts
    componentEventHandler(event) {
        console.log('component event handler method');
        console.log(event.detail);
        let data = JSON.parse(event.detail);
        if(!data) {
            return;
        }
        //need to pass data , instead of data.data becz data.data can be null
        try {
            switch(data.eventType) {
                case EVENTTYPESMAP.PLAYERJOINEVENT:
                    console.log('Game PLAYEJOINEVENT event type '+data.data);
                    this.handlePlayerJoinEvent(data);
                    break;
                case EVENTTYPESMAP.GAMESTARTEVENT:
                    console.log('Game GAMESTARTEVENT event type '+data.data);
                    this.handleGameStartEvent(data);
                    break;
                case EVENTTYPESMAP.POSITIONCHANGEEVENT:
                    this.handlePositionChangeEvent(data);
                    break;

                case EVENTTYPESMAP.NOCHANGEEVENT:
                    console.log('Game NOCHANGEEVENT event type '+data.data);
                    this.handleNoChangeEvent(data);
                    break;  

                case EVENTTYPESMAP.RERUNEVENT:
                    console.log('Game RERUNEVENT event type '+data.data);
                    this.handleReRunEvent(data);
                    break;

                case EVENTTYPESMAP.GAMEOVEREVENT:
                    this.handleGameOverEvent(data);
                    console.log('Game GAMEOVEREVENT event type '+data.data);
                    break;
                
                case EVENTTYPESMAP.RANDOMNUMBEREVENT:
                    console.log('Comp RANDOMNUMBEREVENT event type '+data.data);
                    //this.handleNoChangeEvent(data);
                    this.handleRandomNumberEvent(data);
                    // this.diceRolledDelegate(data.data);
                    break;
                
                case  EVENTTYPESMAP.COINCLICKEDEVENT:
                    console.log('Game COINCLICKEDEVENT event type '+data.data);
                    this.handleCoinClickedEvent(data);
                    break;
                default:
                    console.log('default '+data.eventType);
                    break;
            }
        }
        catch(e) {
            console.log('exception in handler '+ e);
        }

    }

    handlePlayerJoinEvent(data) {
        console.log(' in handlePlayerJoinEvent method ');
    }

    handleGameStartEvent(data) {
        console.log(' in handleGameStartEvent method ');
    }

    handlePositionChangeEvent(data) {
        console.log(' in handlePositionChangeEvent method ');
    }

    handleNoChangeEvent(data) {
        console.log(' in handleNoChangeEvent method ');
    }

    handleReRunEvent(data) {
        console.log(' in handleReRunEvent method ');
    }

    handleGameOverEvent(data) {
        console.log(' in handleGameOverEvent method ');
    }

    handleRandomNumberEvent(data) {
        console.log('in handleRandomNumberEvent method');
        let elementsToActivate;
        this.canPlayerClickCoin = true;
        if(!data || !data.data) {
            console.error(' no data value or data.data value');
        }
        let numberValue = parseInt(data.data);
        this.diceMoveVal = numberValue;
        //change player turn
        if(this.isMovePresentForPlayer(numberValue)) {
            elementsToActivate = this.getComponentsToActivateListener(numberValue);
            this.activateActionListenerToPlayer(elementsToActivate);
        } else {
            this.canPlayerClickCoin = false;
        }
    }

    isMovePresentForPlayer(diceMoveVal) {
        console.log(' in isMovePresentForPlayer method '+diceMoveVal);
        let isMoveAllowed = false;
        let isAnyAtStartBox = false;
        let i = 0;
        let currentPlayerCoinsList = this.getCurrentPlayerCoins();
        let nonStartedCoinsList = this.getPlayerNonStartedCoins(currentPlayerCoinsList);
        let startedAndNonEndedCoinsList = this.getPlayerStartedAndNonEndedCoins(currentPlayerCoinsList);

        isAnyAtStartBox = !nonStartedCoinsList || nonStartedCoinsList.length === 0 ? false : true;

        if(isAnyAtStartBox && diceMoveVal === 1) {
            isMoveAllowed = true;
            return isMoveAllowed;
        }
        if(!startedAndNonEndedCoinsList || startedAndNonEndedCoinsList.length === 0) {
            isMoveAllowed = false;
            return isMoveAllowed;
        }

        for(let i in startedAndNonEndedCoinsList) {
            if(startedAndNonEndedCoinsList[i].position + diceMoveVal <= MAX_VALUE_FOR_HOME) {
                isMoveAllowed = true;
                break;
            }
            
        }
        return isMoveAllowed;
    }

    activateActionListenerToPlayer(componentsList) {
        console.log('in activateActionListenerToPlayer method');
        let startBoxComponent;
        const playerType = this._playerType;
        if(!componentsList || componentsList.length === 0) {
            return;
        }
        for(let key in componentsList) {
            if(componentsList[key].type === START_BOX) {
                this.template.querySelector(`[data-player-type="$playerType"]`).attachClickEventListener();
            } else if(key === MIDDLE_PATH_BOX) {

            }
        }
         
    }

    deactivateActionListenerToPlayer() {
        console.log('in deactivateActionListenerToPlayer method');

        //after deactivating , clear the recentlyactivatedList
        this.canPlayerClickCoin = false;
    }

    //this method is used to activate click event to all coins for this player to make his move
    getComponentsToActivateListener(numEle) {
        console.log('in getComponentsToActivateListener method ');
        let currentPlayerCoinsList = this.getCurrentPlayerCoins();
        let nonStartedCoinsList = this.getPlayerNonStartedCoins(currentPlayerCoinsList);
        let startedAndNonEndedCoinsList = this.getPlayerStartedAndNonEndedCoins(currentPlayerCoinsList);
        let componentsToActivate = [];
        let pathComponentsToActivate = [];
        if(numEle === 1 && nonStartedCoinsList && nonStartedCoinsList.length > 0) {
            componentsToActivate.push({type: START_BOX, values: this.currentPlayerTurn});
        }
        pathComponentsToActivate = this.getPathComponentsFromValue(startedAndNonEndedCoinsList);
        if(pathComponentsToActivate && pathComponentsToActivate.length > 0) {
            componentsToActivate.push({type: MIDDLE_PATH_BOX, values: pathComponentsToActivate});
        }
        return componentsToActivate;
    }

    getPathComponentsFromValue(startedAndNonEndedCoinsList) {
        console.log('in getPathComponentsFromValue method')
        let pathComponentsToActivate = [];
        if(!startedAndNonEndedCoinsList || startedAndNonEndedCoinsList.length === 0) {
            return pathComponentsToActivate;
        }
        for(let positionVal of startedAndNonEndedCoinsList) {
            if(positionVal === -1 || positionVal === 0) {
                console.error('some error positionVal is -1 or 0');
                continue;
            }
            let eleDataVal = this.verticalTopArray.find(indVal => {
                return indVal === positionVal;
            });
            if(!eleDataVal) {
                pathComponentsToActivate.push({data: eleDataVal, pathType: this.verticalTopPathType});
            }

            eleDataVal = this.verticalBottomArray.find(indVal => {
                return indVal === positionVal;
            });
            if(!eleDataVal) {
                pathComponentsToActivate.push({data: eleDataVal, pathType: this.verticalBottomPathType});
            }

            eleDataVal = this.horizontalLeftArray.find(indVal => {
                return indVal === positionVal;
            });
            if(!eleDataVal) {
                pathComponentsToActivate.push({data: eleDataVal, pathType: this.horizontalLeftPathType});
            }

            eleDataVal = this.horizontalRightArray.find(indVal => {
                return indVal === positionVal;
            });
            if(!eleDataVal) {
                pathComponentsToActivate.push({data: eleDataVal, pathType: this.horizontalRightPathType});
            }
        }
        return pathComponentsToActivate;
    }


    handlePlayerJoinEvent(data) {
        console.log(' in handlePlayerJoinEvent method ');
    }

    handleCoinClickedEvent(data) {
        console.log(' in handleCoinClickedEvent method ');
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

    getPlayerHomeBoxArray(playerTypeValue) {
        console.log('in getPlayerHomeBoxArray method');
        let arr;
        if(playerTypeValue === PLAYER_TYPES['player1']) {
            arr = this.verticalBottomArray;
        } else if(playerTypeValue === PLAYER_TYPES['player2']) {
            arr = this.horizontalLeftArray;
        } else if(playerTypeValue === PLAYER_TYPES['player3']) {
            arr = this.verticalTopArray;
        } else if(playerTypeValue === PLAYER_TYPES['player4']) {
            arr = this.horizontalRightArray;
        }
        return arr;
    }

    // this will only set the home run for the current player
    assignHomeValuesForArray() {
        console.log('in assignHomeValuesForArray method');
        // get the actual home box array
        let arr = this.getPlayerHomeBoxArray(this._playerType);
        let initialVal = 0;
        //this gives the array indexes of home number
        let homeArrayIndexes = PLAYER_HOME_ARRAY_INDEXES[this._playerType];
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
        //fill for player1 verticalBottomArray or player1 home till 52, else it creates issue on that location
        this.verticalBottomArray = [6, 0, 46, 5, 0, 47, 4, 0, 48, 3, 0, 49, 2, 0, 50, 1, 52, 51];
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


    getCurrentPlayerCoins() {
        console.log(' in getCurrentPlayerCoins method ');
        let thisPlayerType = this._playerType;
        if(!this.coinObjectList || this.coinObjectList.length == 0 || !thisPlayerType) {
            return null;
        }
        let currentPlayerCoinsList = this.coinObjectList.filter(function(indCoin) {
                                        return indCoin.playerType === thisPlayerType;
                                    });
        return currentPlayerCoinsList;
    }

    getPlayerNonStartedCoins(currentPlayerCoinsList) {
        console.log(' in getPlayerNonStartedCoins method');
        let nonStartedCoinsList = currentPlayerCoinsList.filter(function(indCoin) {
            return indCoin.isStart === false;
        });
        return nonStartedCoinsList;
    }

    getPlayerStartedAndNonEndedCoins(currentPlayerCoinsList) {
        console.log(' in getPlayerStartedAndNonEndedCoins method');
        let startedNonEndedCoinsList = currentPlayerCoinsList.filter(function(indCoin) {
            return indCoin.isEnd === false && indCoin.isStart === true;
        });
        return startedNonEndedCoinsList;
    }

    //Below are only for testing
    testPlayerValues(event) {
        console.log('in testPlayerValues method ');
        //fill for player1 verticalBottomArray fully, else it creates issue
        this.verticalBottomArray = [];
        this.verticalTopArray = [];
        this.horizontalLeftArray = [];
        this.horizontalRightArray = [];
        
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

    testEventHandler(event) {
        console.log(' in testEventHandler method ... current test player perspective is '+this.testPlayerChange);
        let data = JSON.parse(event.detail);
        let numbVal;
        event.stopPropagtion();
        if(!data) {
            return;
        }
        console.log('data is '+ data.data);
        numbVal = parseInt(data.data);
        console.log('  '+ this.getPlayerHomeBoxArray(this.testPlayerChange));
        let output = convertPositionToPlayer1Perspective(numbVal, this.testPlayerChange,
             this.getPlayerHomeBoxArray(this.testPlayerChange));
        console.log('output is '+ output);
    }

    testChangeTestPlayer() {
        console.log('in testChangeTestPlayer method ');
        if(this.testPlayerChange === 'player2') {
            this.testPlayerChange = 'player3';
        } else if(this.testPlayerChange === 'player3') {
            this.testPlayerChange = 'player4';
        } else if(this.testPlayerChange === 'player4') {
            this.testPlayerChange = 'player2';
        } 
    }

}