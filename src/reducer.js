import { generateCardsOnBoards, startGame, removeSet, isFinished, evaluteAllCards } from "./reducer-helper.js";
import _ from 'lodash';

// Set default intial state to easy level
const initialState = startGame("Easy")

/* reducer that controls whole game logic */
const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        // start a new game
        case "RESET":
            return startGame(prevState.curLevel)
        // draw 3 new cards
        case "DRAW":
            let drawCards = generateCardsOnBoards(3, prevState.unusedCards, prevState.cardsOnBoard, prevState.curLevel)
            let gameResult = isFinished(drawCards[0], drawCards[1])[1];
            return {
                curLevel: prevState.curLevel,
                unusedCards: drawCards[0],
                cardsOnBoard: drawCards[1],
                selectedCards: prevState.selectedCards,
                numOfSet: prevState.numOfSet,
                result: gameResult
            }
        // select a card
        case "SELECT":
            let isIn = false;
            // check if this cards has been suggest as a set hint, if yes, reset
            // the isInHint feature to be false
            for (let i = 0; i < prevState.cardsOnBoard.list.length; i++) {
                if (prevState.cardsOnBoard.list[i].isInHint === true) {
                    prevState.cardsOnBoard.list[i].isInHint = false
                }
            }

            // Check if the selected card has been selected before
            for (let card of prevState.selectedCards) {
                if (action.seleCard.id === card.id) {
                    isIn = true;
                    break;
                }
            }
            // case 1: if selected, make it unselected
            if (isIn) {
                let index = prevState.cardsOnBoard.map.get(action.seleCard.id)
                prevState.cardsOnBoard.list[index].isSelected = "white";
                let filtered = prevState.selectedCards.filter(card => card.id !== action.seleCard.id);
                prevState.selectedCards = _.cloneDeep(filtered);
                prevState.result = "None"
            } else {
                // case 2: if unselected, checked the selectedCards' length, if smaller than 3, add
                // it to selectedCards, otherwise directly return
                if (prevState.selectedCards.length < 3) {
                    let index = prevState.cardsOnBoard.map.get(action.seleCard.id)
                    prevState.cardsOnBoard.list[index].isSelected = "#fbbc5b";
                    prevState.selectedCards.push(action.seleCard);
                    prevState.result = "None"
                    // If selected three cards, check if it is a set
                    if (prevState.selectedCards.length === 3) {
                        prevState = removeSet(prevState)
                        // cheeck if game finishes
                        let [finished, gameResult] = isFinished(prevState.unusedCards, prevState.cardsOnBoard)
                        if (finished) {
                            prevState.result = gameResult
                        }
                    }
                } else {
                    return prevState;
                }
            }
            return {
                curLevel: prevState.curLevel,
                unusedCards: prevState.unusedCards,
                cardsOnBoard: prevState.cardsOnBoard,
                selectedCards: prevState.selectedCards,
                numOfSet: prevState.numOfSet,
                result: prevState.result
            }
        // Provide a set hint for user
        case "HINT":
            const [hintResult, boardCards] = evaluteAllCards(prevState.cardsOnBoard, true)
            if (hintResult) {
                return {
                    curLevel: prevState.curLevel,
                    unusedCards: prevState.unusedCards,
                    cardsOnBoard: boardCards,
                    selectedCards: prevState.selectedCards,
                    numOfSet: prevState.numOfSet,
                    result: prevState.result           
                }
            } else {
                return prevState
            }
        // Set different game level
        case "SET_LEVEL":
            prevState.curLevel = action.value
            prevState = startGame(prevState.curLevel)
            return prevState;
        // When hovering on a unselected card, make its color change from white to #ffe2aa
        case "HOVER":
            let index = prevState.cardsOnBoard.map.get(action.seleCard.id)
            if (prevState.cardsOnBoard.list[index].isSelected === "white") {
                prevState.cardsOnBoard.list[index].isSelected = "#ffe2aa";
            } 
            return {
                curLevel: prevState.curLevel,
                unusedCards: prevState.unusedCards,
                cardsOnBoard: _.cloneDeep(prevState.cardsOnBoard),
                selectedCards: prevState.selectedCards,
                numOfSet: prevState.numOfSet,
                result: prevState.result
            }
        // When mouse leaves a unselected card, make its color change from #ffe2aa to white
        case "LEAVE":
            let pos = prevState.cardsOnBoard.map.get(action.seleCard.id)
            if (prevState.cardsOnBoard.list[pos].isSelected === "#ffe2aa") {
                prevState.cardsOnBoard.list[pos].isSelected = "white";
            }
            return {
                curLevel: prevState.curLevel,
                unusedCards: prevState.unusedCards,
                cardsOnBoard: _.cloneDeep(prevState.cardsOnBoard),
                selectedCards: prevState.selectedCards,
                numOfSet: prevState.numOfSet,
                result: prevState.result
            }
        default:
            return prevState
    }
}

export default reducer