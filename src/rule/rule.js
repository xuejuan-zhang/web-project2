import React from 'react';
import NavBar from "../navbar";
import { connect } from 'react-redux';
import './rule.css';
const Rule = ({dispatch}) => {

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
                <NavBar ruleActive="rule-active" level={handleChange}/>
            </div>
            <div className="display">
                <div className="rule-display">                    
                    <div>
                        <h3>Game Cards</h3>
                        <ul>
                            <li>
                                <h4>Easy Level</h4>
                                <p>There are <strong>27</strong> cards in deck. Each card has a variation of the following three features:</p>
                                <img src="../images/card-easy.png" alt="" id="easy-card"></img>
                            </li>
                            
                            <li>
                                <h4>Medium &#38; Hard Level</h4>
                                <p>There are <strong>81</strong> cards in deck. Each card has a variation of the following four features:</p>
                                <img src="../images/card-medium.png" alt="" id="medium-card"></img>
                            </li>
                        </ul>
                    </div>
            
                    <div>
                        <h3>What is a SET?</h3>
                        <p>A 'Set' consists of three cards in which each feature is EITHER the same on each card OR is different on
                            each card. That is to say, any feature in the 'Set' of three cards is either common to all three cards 
                            or is different on each card.</p>
                        <div>For example, the following are SETs:</div>
                        <img src="../images/set-example-diff-shading.png" alt="" className="set-sample"></img>
                        <p>(1) All three cards have the same shape, the same color, the same number of symbols and they have 
                            the different shading.</p>
                        <img src="../images/set-example-same-shading.png" alt="" className="set-sample"></img>
                        <p>(2) All three cards have the different shape, the different color, the different number of symbols and 
                            they have the same shading.</p>
                        <img src="../images/set-example-all-diff.png" alt="" className="set-sample"></img>
                        <p>(3) All three cards have the different shape, the different color, the different number of symbols and 
                            they have the different shading.</p>
                    </div>

                    <div>
                        <h3>Start Game</h3>
                        <ul>
                            <li>Initially, when you start the game, you will see 12 random cards from the deck</li>
                            <li>One you selects one card, it should be highlighted. Clicking an already highlighted card will unselect the card. 
                                If 3 cards are selected, a message will pop up to indicate whether it is a valid SET or not.
                                <div><i className="far fa-grin-alt"></i>
                                    &nbsp;If it is a valid SET, those cards will be discarded and 3 more cards should be drawn to replace them.</div>
                                <div><i className="far fa-frown"></i>
                                    &nbsp;If the 3 cards are NOT a SET, the 3 cards should no longer be highlighted.</div> 
                            </li>
                            <li>Once every card has been putinto a SET, a congratulations message will pop up.</li>
                        </ul>
                    </div>

                    <div>
                       <h3><i className="far fa-lightbulb"></i>&nbsp;Tips</h3>
                       <div>Every time you get stuck and can't find a SET, there are two situations:</div>
                       <ul>
                           <li>There is <i><strong>no SET on board</strong></i>. For easy and hard level, you can keeping click "Draw 3 Cards" button 
                               until a SET appears; for medium level, the system will automatically add cards until a SET appears.</li>
                            <li>There <i><strong>exists a SET, but you can't find it</strong></i>. You can click the "Hint" button, the system will provide
                                a SET suggestions for you.
                            </li>
                       </ul>
                    </div>

                </div>
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
export default connect(dispatchToPropertyMapper)(Rule)

