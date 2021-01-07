const GENERICCOMPONENTEVENT = 'componentevent';
const HOME_NUMBER_CONST = 10000;
const COIN_START_POSITION_CONST = -1;
const MAX_VALUE_FOR_HOME = 58;
const START_BOX = 'ludoPlayerStartBox';
const MIDDLE_PATH_BOX = 'ludoVerticalPath';

const PLAYERNAMEMAP = {
    'player1': 'player1',
    'player2': 'player2',
    'player3': 'player3',
    'player4': 'player4'
};

// single platform event can be of these types
// RERUN event is used to fire next roll by the same player
// POSITIONCHANGE is used to fire change of die's position, includes player cut etc
// NOCHANGEEVENT is used to fire no change event // when player die's number is useless
// GAMESTARTEVENT is used to start the game , from this event player1 makes the move
// PLAYEJOINEVENT is used to joined to the game
// GAMEOVEREVENT is used to end the game and show the winner name to others
const EVENTTYPESMAP = {
    'PLAYERJOINEVENT': 'PLAYERJOINEVENT',
    'GAMESTARTEVENT': 'GAMESTARTEVENT',
    'POSITIONCHANGEEVENT': 'POSITIONCHANGEEVENT',
    'NOCHANGEEVENT': 'NOCHANGEEVENT',
    'RERUNEVENT': 'RERUNEVENT',
    'GAMEOVEREVENT': 'GAMEOVEREVENT',
    'RANDOMNUMBEREVENT': 'RANDOMNUMBEREVENT',
    'COINCLICKEDEVENT': 'COINCLICKEDEVENT'
};

const PLAYER_TYPES = {
    'player1': 'player1',
    'player2': 'player2',
    'player3': 'player3',
    'player4': 'player4'
};
const PLAYER_CALC_UNIQUE_VALUE = {
    'player1': 0,
    'player2': 13,
    'player3': 26,
    'player4': 39
};

const PLAYER_HOME_ARRAY_INDEXES = {
    'player1': [16, 13, 10, 7, 4, 1],
    'player2': [6, 7, 8, 9, 10, 11],
    'player3': [1, 4, 7, 10, 13, 16],
    'player4': [11, 10, 9, 8, 7, 6]
};


const OTHER_PLAYER_HOME_RUN_FROM_PLAYER1_PERSPECTIVE = {
    'player1': [],
    'player2': [6, 7, 8, 9, 10, 11],
    'player3': [1, 4, 7, 10, 13, 16],
    'player4': [11, 10, 9, 8, 7, 6]
};


const COINOBJECTLIST = [
    {name: 'coin1', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player1, uniqueId: ('coin1-' + PLAYERNAMEMAP.player1)},
    {name: 'coin2', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player1, uniqueId: ('coin2-' + PLAYERNAMEMAP.player1)},
    {name: 'coin3', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player1, uniqueId: ('coin3-' + PLAYERNAMEMAP.player1)},
    {name: 'coin4', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player1, uniqueId: ('coin4-' + PLAYERNAMEMAP.player1)},

    {name: 'coin1', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player2, uniqueId: ('coin1-' + PLAYERNAMEMAP.player2)},
    {name: 'coin2', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player2, uniqueId: ('coin2-' + PLAYERNAMEMAP.player2)},
    {name: 'coin3', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player2, uniqueId: ('coin3-' + PLAYERNAMEMAP.player2)},
    {name: 'coin4', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player2, uniqueId: ('coin4-' + PLAYERNAMEMAP.player2)},

    {name: 'coin1', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player3, uniqueId: ('coin1-' + PLAYERNAMEMAP.player3)},
    {name: 'coin2', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player3, uniqueId: ('coin2-' + PLAYERNAMEMAP.player3)},
    {name: 'coin3', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player3, uniqueId: ('coin3-' + PLAYERNAMEMAP.player3)},
    {name: 'coin4', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player3, uniqueId: ('coin4-' + PLAYERNAMEMAP.player3)},

    {name: 'coin1', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player4, uniqueId: ('coin1-' + PLAYERNAMEMAP.player4)},
    {name: 'coin2', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player4, uniqueId: ('coin2-' + PLAYERNAMEMAP.player4)},
    {name: 'coin3', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player4, uniqueId: ('coin3-' + PLAYERNAMEMAP.player4)},
    {name: 'coin4', position: COIN_START_POSITION_CONST, isEnd: false, isStart: false, playerType: PLAYERNAMEMAP.player4, uniqueId: ('coin4-' + PLAYERNAMEMAP.player4)}
];


const CALC_EQUALIZER_UNIQUE_VALUE = 52;


export {
    GENERICCOMPONENTEVENT, EVENTTYPESMAP,
    PLAYER_TYPES, PLAYER_CALC_UNIQUE_VALUE, PLAYER_HOME_ARRAY_INDEXES,
    CALC_EQUALIZER_UNIQUE_VALUE, OTHER_PLAYER_HOME_RUN_FROM_PLAYER1_PERSPECTIVE,
    HOME_NUMBER_CONST, MAX_VALUE_FOR_HOME, START_BOX, MIDDLE_PATH_BOX,
    COINOBJECTLIST
};