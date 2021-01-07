const getCurrentPlayerCoins = (coinObjectList, playerType) => {
    console.log(' in getCurrentPlayerCoins method ');
    if(!coinObjectList || coinObjectList.length == 0 || !playerType) {
        return null;
    }
    let currentPlayerCoinsList = coinObjectList.filter(function(indCoin) {
                                    return indCoin.playerType === playerType;
                                });
    return currentPlayerCoinsList;
}

const getPlayerNonStartedCoins  = (coinObjectList, playerType) => {
    console.log(' in getPlayerNonStartedCoins method');
    if(!coinObjectList || coinObjectList.length == 0 || !playerType) {
        return null;
    }
    let nonStartedPlayerCoinsList = coinObjectList.filter(function(indCoin) {
                                    return indCoin.playerType === playerType && indCoin.isStart === false;
                                });
    return nonStartedPlayerCoinsList;
}

const getPlayerStartedAndNonEndedCoins = (coinObjectList, playerType) => {
    console.log(' in getPlayerStartedAndNonEndedCoins method');
    if(!coinObjectList || coinObjectList.length == 0 || !playerType) {
        return null;
    }
    let startedNonEndedCoinsList = coinObjectList.filter(function(indCoin) {
        return indCoin.isEnd === false && indCoin.isStart === true && indCoin.playerType === playerType;
    });
    return startedNonEndedCoinsList;
}

export {
    getCurrentPlayerCoins, getPlayerNonStartedCoins, getPlayerStartedAndNonEndedCoins
};