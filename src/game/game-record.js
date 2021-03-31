import React from 'react';
import { connect } from 'react-redux'
import GameAction from './game-action'

/* GameRecord that controls the game related button and records of current game status */
const GameRecord = ({ numOfSet, curLevel, unusedCards }) => {
    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    const toggleRecord = () => {
        var x = document.getElementById("myRecord");
        if (x.className === "game-record") {
            x.className += " responsive";
        } else {
            x.className = "game-record";
        }
    }
    
    return (
        <div className="game-record" id="myRecord">
                <div>Game Record</div>
                <div>Current Level: {curLevel}</div>
                <div>Cards in deck: {unusedCards.list.length}</div>
                <div>Sets found: {numOfSet}</div>
                <GameAction />
            <a className="icon" href="#" onClick={() => toggleRecord()}>
                <i className="fa fa-bars"></i>
            </a>
        </div>
    )
}

const stateToPropertyMapper = (state) => {
    return {
        numOfSet: state.numOfSet,
        curLevel: state.curLevel,
        unusedCards: state.unusedCards
    }
}
export default connect(stateToPropertyMapper)(GameRecord)