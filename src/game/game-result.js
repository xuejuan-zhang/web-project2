import React from 'react'
import { connect } from 'react-redux';

/* Result that notifies different game status */
const Result = ({ result }) => {
    let alertType = "alert alert-light sticky"
    let text = "Mark 3 cards with mouse-click"
    // case: find a set
    if (result === "Set") {
        alertType = "alert alert-primary sticky"
        text = "Set Found!"
    // case: selected cards are not set
    } else if (result === "Not") {
        alertType = "alert alert-warning sticky"
        text = "Not a Set!"
    // case: win the game
    } else if (result === "Win") {
        alertType = "alert alert-success sticky"
        text = "Congratulations! You win!"
    // case: fail the game, need to restart
    } else if (result === "Fail") {
        alertType = "alert alert-danger sticky"
        text = "Sorry. Game Over"        
    } else {
        alertType = "alert alert-light sticky"
        text = "Mark 3 cards with mouse-click"        
    }
    return (
        <div className="game-result">
            <div className={alertType} >{text}</div>    
        </div>
    )
}

const stateToPropertyMapper = (state) => {
    return {
        result: state.result,
    }
}
export default connect(stateToPropertyMapper)(Result)