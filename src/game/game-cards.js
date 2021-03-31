import React, {useState} from 'react';
import { connect } from 'react-redux'
import Card from './game-card.js'

/* Cards that display on game board*/
const GameCards = ({cardsOnBoard, select, hover, leave}) => {
    return(
       <>
         <div id="game-board">
            <div className="game-cards">
                {cardsOnBoard.list.map((card) =>
                    <Card select={select} hover={hover} leave={leave}
                        key={card.id} card={card} id={card.id}/>
                )}
                
                {/* placeholder to make last row left aligned */}
                {cardsOnBoard.list.length % 4 === 1 && 
                <> <div className="place-holder" id="place-holder-small"></div>
                    <div className="place-holder"></div>
                    <div className="place-holder"></div> </>}

                {cardsOnBoard.list.length % 4 === 2 && 
                <> <div className="place-holder"></div>
                    <div className="place-holder"></div>
                    </>}

                {cardsOnBoard.list.length % 4 === 3 && <> <div className="place-holder"></div></>}
            </div>
        </div>
       </>)
}

const stateToPropertyMapper = (state) => {
    return {
        cardsOnBoard: state.cardsOnBoard,
        currentGameSate: state,
        
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        select: (card) => {
            dispatch({ type: "SELECT", seleCard: card})
        },
        hover: (card) => {
            dispatch({ type: "HOVER", seleCard: card})
        },
        leave: (card) => {
            dispatch({ type: "LEAVE", seleCard: card})
        }
    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(GameCards)