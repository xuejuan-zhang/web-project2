import React from 'react';
import { connect } from 'react-redux';

// GameAction that controls REST, HINT and Draw 3 Cards button
const GameAction = ({draw, reset, hint}) => { 
    return (
        <div className="game-buttons">
            <button onClick={reset} className="record-button">Reset</button>
            <button onClick={hint} className="record-button">Hint</button>
            <button onClick={draw} className="record-button">Draw 3 Cards</button>
        </div>)
}

const stateToPropertyMapper = (state) => {
    return {
        currentGameSate: state,
    }
 }

const dispatchToPropertyMapper = (dispatch) => {
    return {
        draw: () => {
            dispatch({ type: "DRAW" })
        },
        reset: () => {
            dispatch({ type: "RESET" })
        },
        hint: () => {
            dispatch({ type: "HINT"})
        }
    }
}
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(GameAction)

