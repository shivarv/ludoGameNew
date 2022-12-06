import { LightningElement, track, api } from 'lwc';
import {
    PLAYER_TYPES, PLAYER_CALC_UNIQUE_VALUE, PLAYER_HOME_ARRAY_INDEXES,
    CALC_EQUALIZER_UNIQUE_VALUE, OTHER_PLAYER_HOME_RUN_FROM_PLAYER1_PERSPECTIVE,
    EVENTTYPESMAP, MAX_VALUE_FOR_HOME, START_BOX, MIDDLE_PATH_BOX,
    COINOBJECTLIST, 
    VERTICALTOPPATHTYPE, VERTICALBOTTOMPATHTYPE, HORIZONTALLEFTPATHTYPE, HORIZONTALRIGHTPATHTYPE
} from 'c/ludoUtilityConstant';
import {
    getCurrentPlayerCoins, getPlayerNonStartedCoins, getPlayerStartedAndNonEndedCoins,
    getAllPlayersStartedAndNonEndedCoins
} from 'c/ludoUtilityLogics';

import {
    convertPositionFromPlayer1Perspective, convertPositionToPlayer1Perspective,
    generateRandomNumberHelper, fireComponentEventHelper,
    ludoPositionMoveService
} from 'c/ludoUtilityServices';
import LUDO_RESOURCE from '@salesforce/resourceUrl/ludo';

const IMAGE_PATH = '/ludo/images/';
//move the coin position to parent and sent only the boardDetails to Path
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

    images = {
        ludoImgUrl : LUDO_RESOURCE +  IMAGE_PATH + 'ludoIcon.png',
        user1ImgUrl : LUDO_RESOURCE + IMAGE_PATH + 'user1.jpg',
        user2ImgUrl : LUDO_RESOURCE + IMAGE_PATH + 'user2.jpg',
        user3ImgUrl : LUDO_RESOURCE + IMAGE_PATH + 'user3.png',
        user4ImgUrl : LUDO_RESOURCE + IMAGE_PATH + 'user4.png'
    };

    colorRed = 'red';
    colorGreen = 'green';
    colorBlue = 'blue';
    colorYellow = 'yellow';

    verticalTopPathType = VERTICALTOPPATHTYPE;
    verticalBottomPathType = VERTICALBOTTOMPATHTYPE;
    horizontalLeftPathType = HORIZONTALLEFTPATHTYPE;
    horizontalRightPathType = HORIZONTALRIGHTPATHTYPE;

    @track
    boardPathDetails;
    @track
    verticalTopArrayObject;
    @track
    verticalBottomArrayObject;
    @track
    horizontalLeftArrayObject;
    @track
    horizontalRightArrayObject;

    verticalTopArray;
    verticalBottomArray;
    horizontalLeftArray;
    horizontalRightArray;


    @api
    get playerType() {
        console.log('in get playerType method');
        return this._playerType;
    }
    set playerType(value) {
        console.log('in set playerType method');
        this._playerType = value;

        // i need to revaluate the logics for these methods and come up with something better
        this.assignPlayerUniqueValue();
        this.assignPathDataArrayValues();
        this.setupBoardPathDetails();
    }

    constructor() {
        super();
        //this.boardCoinPositionList = [];
    }

    get verticalTopArrayObj() {
        console.log(' in verticalTopArrayObj ');
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
                //for testing
                case 'testPerspective':
                    this.testEventHandler(event);
                    break;
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
            console.log(e.stack);
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
        ludoPositionMoveService(this, data);
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

    
    handlePlayerJoinEvent(data) {
        console.log(' in handlePlayerJoinEvent method ');
    }

    handleCoinClickedEvent(data) {
        console.log(' in handleCoinClickedEvent method ');
        //it means the coin is moved from starting
        if(data.data.positionFrom === -1) {
            ludoPositionMoveService( data, this._playerType, this.boardPathDetails, this.coinObjectList);
        }
    }

    isMovePresentForPlayer(diceMoveVal) {
        console.log(' in isMovePresentForPlayer method '+diceMoveVal);
        let isMoveAllowed = false;
        let isAnyAtStartBox = false;
        
        return isMoveAllowed;
    }

    activateActionListenerToPlayer(componentsList) {
        console.log('in activateActionListenerToPlayer method');
        let startBoxComponent;
        let playerType;
        if(!componentsList || componentsList.length === 0) {
            return;
        }
        for(let key in componentsList) {
            if(componentsList[key].type === START_BOX) {
                playerType = componentsList[key].values.playerType;
                this.template.querySelector(`c-ludo-player-start-box[data-player-type="${playerType}"]`).attachClickEventListener();
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
        
    }

    getPathComponentsFromValue(startedAndNonEndedCoinsList) {
        console.log('in getPathComponentsFromValue method')
        return [];
        /*
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
        return pathComponentsToActivate; */
    }


    setupBoardPathDetails() {
        console.log(' in setupBoardPathDetails method ');
        
    }

    assignPlayerUniqueValue() {
        console.log('in assignPlayerUniqueValue method ');
        //this is needed for perspective calculation
        this._playerUniqueValue = PLAYER_CALC_UNIQUE_VALUE[this._playerType];
    }

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
        let onlyStartedCoins = getAllPlayersStartedAndNonEndedCoins(this.coinObjectList);
        console.log('arr value is '+JSON.stringify(arr));
        console.log('coinObjectList value is '+JSON.stringify(this.coinObjectList));
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
    }

    assignPathDataArrayValues() {
        console.log('in assignPathDataArrayValues method');
        //player 1 is default and is blue
        //player 2 is red
        //player 3 is green
        //player 4 is yellow
        let verticalTopArray = [];
        let verticalBottomArray = [];
        let horizontalLeftArray = [];
        let horizontalRightArray = [];
        this.configureDefaultArrayValues(verticalTopArray, verticalBottomArray,
                                        horizontalLeftArray, horizontalRightArray);
        this.subtractUniqueValueFromArray(verticalTopArray, verticalBottomArray,
                                        horizontalLeftArray, horizontalRightArray);
        this.equaliseWrongValuesForArray(verticalTopArray, verticalBottomArray,
                                        horizontalLeftArray, horizontalRightArray);
        this.assignHomeValuesForArray(verticalTopArray, verticalBottomArray,
                                        horizontalLeftArray, horizontalRightArray);
        this.fillZeroByNegativeNumbers(verticalTopArray, verticalBottomArray,
                                        horizontalLeftArray, horizontalRightArray);

        console.log('path1 array' + verticalBottomArray);
        console.log('path2 array' + horizontalLeftArray);
        console.log('path3 array ' + verticalTopArray);
        console.log('path4 array ' + horizontalRightArray);

        this.verticalTopArrayObject = this.convertArrayWithPostion(verticalTopArray);
        this.verticalBottomArrayObject = this.convertArrayWithPostion(verticalBottomArray);
        this.horizontalLeftArrayObject = this.convertArrayWithPostion(horizontalLeftArray);
        this.horizontalRightArrayObject = this.convertArrayWithPostion(horizontalRightArray);

        console.log('path1 Object' + JSON.stringify(this.verticalBottomArrayObject));
        console.log('path2 Object' + JSON.stringify(this.horizontalLeftArrayObject));
        console.log('path3 Object ' + JSON.stringify(this.verticalTopArrayObject));
        console.log('path4 Object ' + JSON.stringify(this.horizontalRightArrayObject));

        this.boardPathDetails = {
            'verticalTopArray': this.verticalTopArrayObject,
            'verticalBottomArray': this.verticalBottomArrayObject,
            'horizontalLeftArray': this.horizontalLeftArrayObject,
            'horizontalRightArray': this.horizontalRightArrayObject
        };
    }




    
    configureDefaultArrayValues(verticalTopArray, verticalBottomArray,
                                horizontalLeftArray, horizontalRightArray) {
        console.log('in configureDefaultArrayValues method ');
        //fill for player1 verticalBottomArray or player1 home till 52, else it creates issue on that location
        //the reason these no's are bit confusing is because in css horizontal block are aligned horizontally,
        // vertical block are aligned vertically
        verticalTopArray.push.apply(verticalTopArray, [25, 26, 27, 24, 0, 28, 23, 0, 29, 22, 0, 30, 21, 0, 31, 20, 0, 32]);
        verticalBottomArray.push.apply(verticalBottomArray, [6, 0, 46, 5, 0, 47, 4, 0, 48, 3, 0, 49, 2, 0, 50, 1, 52, 51]);
        horizontalLeftArray.push.apply(horizontalLeftArray, [14, 15, 16, 17, 18, 19, 13, 0, 0, 0, 0, 0, 12, 11, 10, 9, 8, 7]);
        horizontalRightArray.push.apply(horizontalRightArray, [33, 34, 35, 36, 37, 38, 0, 0, 0, 0, 0, 39, 45, 44, 43, 42, 41, 40]);
    }

    subtractUniqueValueFromArray(verticalTopArray, verticalBottomArray,
                                horizontalLeftArray, horizontalRightArray) {
        console.log('in subtractUniqueValueFromArray method');
        this.individualArraySubtractionHelper(verticalTopArray);
        this.individualArraySubtractionHelper(verticalBottomArray);
        this.individualArraySubtractionHelper(horizontalLeftArray);
        this.individualArraySubtractionHelper(horizontalRightArray);
    }

    individualArraySubtractionHelper(array) {
        console.log(' in individualArraySubtractionHelper method');
        for(let index in array) {
            if(array[index] !== 0) {
                array[index] = array[index] - this._playerUniqueValue;
            }
        }
    }   

    equaliseWrongValuesForArray(verticalTopArray, verticalBottomArray,
                                horizontalLeftArray, horizontalRightArray) {
        console.log('in equaliseWrongValuesForArray method');
        this.individualEqualiseWrongValueHelper(verticalTopArray);
        this.individualEqualiseWrongValueHelper(verticalBottomArray);
        this.individualEqualiseWrongValueHelper(horizontalLeftArray);
        this.individualEqualiseWrongValueHelper(horizontalRightArray);
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

    
    // this will only set the home run for the current player
    assignHomeValuesForArray(verticalTopArray, verticalBottomArray,
                            horizontalLeftArray, horizontalRightArray) {
        console.log('in assignHomeValuesForArray method');
        // get the actual home box array
        let arr = this.getPlayerHomeBoxArrayHelper(verticalTopArray, verticalBottomArray,
                                                horizontalLeftArray, horizontalRightArray,
                                                this._playerType);
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

    getPlayerHomeBoxArrayHelper(verticalTopArray, verticalBottomArray,
                                horizontalLeftArray, horizontalRightArray, playerTypeValue) {
        console.log('in getPlayerHomeBoxArrayHelper method');
        let arr;
        if(playerTypeValue === PLAYER_TYPES['player1']) {
            arr = verticalBottomArray;
        } else if(playerTypeValue === PLAYER_TYPES['player2']) {
            arr = horizontalLeftArray;
        } else if(playerTypeValue === PLAYER_TYPES['player3']) {
            arr = verticalTopArray;
        } else if(playerTypeValue === PLAYER_TYPES['player4']) {
            arr = horizontalRightArray;
        }
        return arr;
    }

    // this is needed because key needs to be unique
    fillZeroByNegativeNumbers(verticalTopArray, verticalBottomArray,
                            horizontalLeftArray, horizontalRightArray) {
        let initNumberObj = {value: -100};
        console.log('in fillZeroByNegativeNumbers method');
        this.individualArrayFill(verticalBottomArray, initNumberObj);
        this.individualArrayFill(verticalTopArray, initNumberObj);
        this.individualArrayFill(horizontalLeftArray, initNumberObj);
        this.individualArrayFill(horizontalRightArray, initNumberObj);
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


    //Below are only for testing
    testChangePlayerValues(event) {
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
        this.testChangePlayerValues();
        console.log(' in testEventHandler method ... current test player perspective is '+this.testPlayerChange);
        let data = JSON.parse(event.detail);
        let numbVal;
        //event.stopPropagtion();
        if(!data) {
            return;
        }
        console.log('data is '+ data.data);
        numbVal = parseInt(data.data);
        
    }

}