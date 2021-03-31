import React from 'react';
import GameRecord from './game-record.js'
import GameCards from './game-cards'
import NavBar from '../navbar'
import { connect } from 'react-redux';
import Result from './game-result.js'
import './game.css'

/* Game that represents the game all the game board except header */
const Game = ({ dispatch }) => {
    const handleChange = (action, value) => {
        dispatch({
            type: action,
            value: value,
        })
    }

    return (
        <div>
            <div className="container">
               <div className="header">
                <NavBar gameActive="game-active" level={handleChange} />
            </div>
                <Result />
                <div className="row">
                    <div className="col-md-3 col-12"><GameRecord /></div>
                    <div className="col-md-9 col-12"><GameCards /></div>
                </div>
                <div className="footer"></div>
            </div>
        </div> 
    )
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        dispatch: dispatch,
    }
}

export default connect(dispatchToPropertyMapper)(Game)


