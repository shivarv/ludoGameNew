import {
    PLAYER_TYPES, PLAYER_CALC_UNIQUE_VALUE, PLAYER_CALC_HOME_ARRAY_INDEXES,
    CALC_EQUALIZER_UNIQUE_VALUE
} from 'c/ludoUtilityConstant';

//params must be object
// sample component event 
// {data: dataNum, firePlatformEvent: true, eventType: COMPONENTEVENTTYPESMAP.positionchangeevent}
const fireComponentEvent = ( params, reference, isBubbles, isComposed) => {
    console.log('in fire compponent event '+GENERICCOMPONENTEVENT);
    const eventToFire = new CustomEvent(GENERICCOMPONENTEVENT, { detail: params,
                                            bubbles: isBubbles, composed: isComposed
    
                        });
    // Dispatches the event.
    reference.dispatchEvent(eventToFire);
};

const convertPositionFromPlayer1Perspective = (player1PositionValue, currentPlayerType) => {
    console.log(' in convertPositionFromPlayer1Perspective method')

    let currentPlayerPositionValue;
    let calVal = CALC_EQUALIZER_UNIQUE_VALUE - PLAYER_CALC_UNIQUE_VALUE[currentPlayerType] + player1PositionValue;
    if(currentPlayerType === PLAYER_TYPES['player1']) {
        currentPlayerPositionValue = player1PositionValue;
    } else if(currentPlayerType === PLAYER_TYPES['player2']) {
        currentPlayerPositionValue =  calVal % CALC_EQUALIZER_UNIQUE_VALUE;
    } else if(currentPlayerType === PLAYER_TYPES['player3']) {
        currentPlayerPositionValue =  calVal % CALC_EQUALIZER_UNIQUE_VALUE;
    } else if(currentPlayerType === PLAYER_TYPES['player4']) {
        currentPlayerPositionValue =  calVal % CALC_EQUALIZER_UNIQUE_VALUE;
    }
    return currentPlayerPositionValue;
}

export {
    fireComponentEvent, convertPositionFromPlayer1Perspective
};