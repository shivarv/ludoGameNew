import {
    GENERICCOMPONENTEVENT, HOME_NUMBER_CONST,
    PLAYER_TYPES, PLAYER_CALC_UNIQUE_VALUE, PLAYER_HOME_ARRAY_INDEXES,
    CALC_EQUALIZER_UNIQUE_VALUE, COIN_UNIQUE_ID_DELIMITER
} from 'c/ludoUtilityConstant';

import {
    findConflictingCoinsAtPosition, processNewCoinListAtPositionForBoardDrawing
} from 'c/ludoUtilityLogics';


const generateCoinUniqueId = function(coinIndex, playerType) {
    console.log('in generateCoinUniqueId method coinIndex '+coinIndex + ' playerType '+playerType);
    let coinUniqueId = ('coin' + (coinIndex + 1) + COIN_UNIQUE_ID_DELIMITER + playerType);
    console.log(' unique id is '+coinUniqueId);
    return coinUniqueId;
 }

//params must be string, data inside must be object -> safe to be object
// sample component event 
// {data: dataNum, firePlatformEvent: true, eventType: COMPONENTEVENTTYPESMAP.positionchangeevent}
const fireComponentEventHelper = (params, reference, isBubbles, isComposed) => {
    console.log('in fire compponent event helper'+GENERICCOMPONENTEVENT);
    const eventToFire = new CustomEvent(GENERICCOMPONENTEVENT, { detail: params,
                                            bubbles: isBubbles, composed: isComposed
    
                        });
    // Dispatches the event.
    reference.dispatchEvent(eventToFire);
};

const generateRandomNumberHelper = () => {
    let randNum = Math.floor(Math.random() * 5) + 1;
    return randNum;
}

const convertPositionFromPlayer1Perspective = (player1PositionValue, currentPlayerType) => {
    console.log(' in convertPositionFromPlayer1Perspective method')

    let currentPlayerPositionValue;
    let calVal = CALC_EQUALIZER_UNIQUE_VALUE - PLAYER_CALC_UNIQUE_VALUE[currentPlayerType] + player1PositionValue;
    if(currentPlayerType === PLAYER_TYPES['player1']) {
        currentPlayerPositionValue = player1PositionValue;
    } else {
        currentPlayerPositionValue =  calVal % CALC_EQUALIZER_UNIQUE_VALUE;
    }
    return currentPlayerPositionValue;
}

const findCoinByIdHelper = (coinObjectList, uniqueId) => {
    console.log('in findCoinByIdHelper method ');
    let coinItem;
    if(!coinObjectList || !uniqueId) {
        return null;
    }
    coinItem = coinObjectList.find(ele => {
                return ele.uniqueId === uniqueId;
            });
    return coinItem;
}


const ludoPositionMoveService = (data, currentPlayerType, boardPathDetails, coinObjectList) => {
    //{"data":{"positionFrom":-1,"positionTo":1,"hasStarted":true,"coinId":"coin4player1","isHome":false},"firePlatformEvent":true,"eventType":"COINCLICKEDEVENT"}
    console.log('in ludoPositionMoveService method ');
    console.log(JSON.stringify(data));
    let coinItem;
    let otherCoinsAtPosition = findConflictingCoinsAtPosition(coinObjectList, data.positionTo, currentPlayerType);
    let calculatedNewCoins = [];
    if(!data || !data.data || !data.data.coinId) {
        return null;
    }
    coinItem = findCoinByIdHelper(coinObjectList, data.data.coinId);
    coinItem.position = data.data.positionTo;
    coinItem.hasStarted = true;
    calculatedNewCoins.push(coinItem.uniqueId);
    processNewCoinListAtPositionForBoardDrawing(boardPathDetails, calculatedNewCoins, data.data.positionTo);
}

//Other's perspective to player1 perspective
const convertPositionToPlayer1Perspective = (currentPlayerPositionValue, currentPlayerType, 
                                                currentPlayerArray
                                            ) => {
    console.log(' in convertPositionFromPlayer1Perspective method')

    let player1PositionValue;
    let calVal = PLAYER_CALC_UNIQUE_VALUE[currentPlayerType] + currentPlayerPositionValue;
    
    //undefined for player1
    let homeRunArray = PLAYER_HOME_ARRAY_INDEXES[currentPlayerType];

    if(currentPlayerType === PLAYER_TYPES['player1']) {
        player1PositionValue = currentPlayerPositionValue;
    } else {
        if(currentPlayerPositionValue >= CALC_EQUALIZER_UNIQUE_VALUE) {
            player1PositionValue =  currentPlayerPositionValue - CALC_EQUALIZER_UNIQUE_VALUE < 6 ?
            currentPlayerArray[homeRunArray[currentPlayerPositionValue - CALC_EQUALIZER_UNIQUE_VALUE]] : HOME_NUMBER_CONST;
        } else {
            player1PositionValue =  calVal % CALC_EQUALIZER_UNIQUE_VALUE;
        }
    }
    return player1PositionValue;
}

export {
    fireComponentEventHelper, convertPositionFromPlayer1Perspective, convertPositionToPlayer1Perspective,
    generateRandomNumberHelper, generateCoinUniqueId, ludoPositionMoveService
};