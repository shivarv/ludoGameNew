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

const PLAYER_CALC_HOME_ARRAY_INDEXES = {
    'player1': [16, 13, 10, 7, 4, 1],
    'player2': [6, 7, 8, 9, 10, 11],
    'player3': [1, 4, 7, 10, 13, 16],
    'player4': [11, 10, 9, 8, 7, 6]
};


const OTHER_PLAYER_HOME_RUN_FROM_PLAYER1_PERSPECTIVE = {
    'player2': [6, 7, 8, 9, 10, 11],
    'player3': [2, 5, 8, 11, 14, 17],
    'player4': [11, 10, 9, 8, 7, 6]
};

const CALC_EQUALIZER_UNIQUE_VALUE = 52;


export {
    PLAYER_TYPES, PLAYER_CALC_UNIQUE_VALUE, PLAYER_CALC_HOME_ARRAY_INDEXES,
    CALC_EQUALIZER_UNIQUE_VALUE, OTHER_PLAYER_HOME_RUN_FROM_PLAYER1_PERSPECTIVE
};