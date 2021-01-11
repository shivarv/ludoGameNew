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
                                    return indCoin.playerType === playerType && indCoin.hasStarted === false;
                                });
    return nonStartedPlayerCoinsList;
}

const getPlayerStartedAndNonEndedCoins = (coinObjectList, playerType) => {
    console.log(' in getPlayerStartedAndNonEndedCoins method');
    if(!coinObjectList || coinObjectList.length == 0 || !playerType) {
        return null;
    }
    let startedNonEndedCoinsList = coinObjectList.filter(function(indCoin) {
        return indCoin.hasEnded === false && indCoin.hasStarted === true && indCoin.playerType === playerType;
    });
    return startedNonEndedCoinsList;
}

const getAllPlayersStartedAndNonEndedCoins = (coinObjectList) => {
    console.log(' in getPlayerStartedAndNonEndedCoins method');
    if(!coinObjectList || coinObjectList.length == 0) {
        return null;
    }
    let startedNonEndedCoinsList = coinObjectList.filter(function(indCoin) {
        return indCoin.hasEnded === false && indCoin.hasStarted === true;
    });
    return startedNonEndedCoinsList;
}


const findConflictingCoinsAtPosition = (coinObjectList, position, currentPlayerType) => {
    console.log(' in findConflictingCoinsAtPosition method');
    //need to handle if the position is safe spot or if its home safe spot for the player 
    if(!coinObjectList || coinObjectList.length == 0) {
        return null;
    }
    let otherPlayerCoinAtPositionList = coinObjectList.filter(function(indCoin) {
        return (indCoin.hasEnded === false && indCoin.hasStarted === true 
                && playerType !== currentPlayerType && position === position);
    });
    return otherPlayerCoinAtPositionList;
}

//boardPathDetails , here you need to  change the coinsListAtPosition
const processNewCoinListAtPositionForBoardDrawing = (boardPathDetails, newCoinIdsList, position) => {
    console.log(' at processNewCoinListAtPosition method ');
    let boardObjectLocation;
    console.log('boardPathDetails '+JSON.stringify(boardPathDetails));
    for(let property in boardPathDetails) {
        if(boardPathDetails[property]) {
            boardObjectLocation = boardPathDetails[property].find( (ele) => {
                    return ele.value === position;
                });
            if(boardObjectLocation) {
                break;
            }
        }
    }
    if(boardObjectLocation) {
        boardObjectLocation.coinList.splice(0, boardObjectLocation.coinList.length);
        //because need to copy every individual element in array instead of array
        for(let newCoin of newCoinIdsList) {
            boardObjectLocation.coinList.push(newCoin);
        }

        //didnt Work, doesnt consider ...newCoinIdsList item as a string
        // boardObjectLocation.coinList.push([...newCoinIdsList]);
    }
}


export {
    getCurrentPlayerCoins, getPlayerNonStartedCoins, getPlayerStartedAndNonEndedCoins,
    getAllPlayersStartedAndNonEndedCoins, findConflictingCoinsAtPosition, processNewCoinListAtPositionForBoardDrawing
};