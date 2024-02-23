// gameReducer.js

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LEVEL':
            return {
                ...state,
                level: action.payload,
            };
        case 'SHOW_HISTORY':
            return {
                ...state,
                showHistory: action.payload, // true or false
            };
        default:
            return state;
    };
}

export default gameReducer;