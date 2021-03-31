import _ from 'lodash';

/* Create deck for medium and hard level */
export function createDeck() {
    let cardsInfo = {
        "list": [],
        "map": new Map(),
    }
    let colors = ["green", "purple", "red"];
    let shapes = ["square", "circle", "triangle"];
    let shades = ["none", "line", "color"];
    for (let color of colors) {
        for (let shape of shapes) {
            for (let shade of shades) {
                for (let i = 1; i <= 3; i++) {
                    let card = {
                        "color": color,
                        "shape": shape,
                        "shade": shade,
                        "number": i,
                        "id": color + shape + shade + i,
                        "isSelected": "white",
                        "isInHint": false
                    }             
                    insertCard(card, cardsInfo);
                }
            }
        }
    }
    return cardsInfo;
}

/* Create deck for easy level */
export function createEasyDeck() {
    let cardsInfo = {
        "list": [],
        "map": new Map(),
    }
    let colors = ["green", "purple", "red"];
    let shapes = ["square", "circle", "triangle"];
    for (let color of colors) {
        for (let shape of shapes) {
            for (let i = 1; i <= 3; i++) {
                let card = {
                    "color": color,
                    "shape": shape,
                    "shade": "color",
                    "number": i,
                    "id": color + shape + "color" + i,
                    "isSelected": "white",
                    "isInHint": false
                }             
                insertCard(card, cardsInfo);
            }
        }
    }
    return cardsInfo;
}

/* Initialize a game */
export function startGame(level) {
    let unusedCards;
    if (level === "Easy") {
        unusedCards = createEasyDeck();
    } else {
        unusedCards = createDeck()
    }
    // reset cards on board
    let cardsOnBoard = {
        "list": [],
        "map": new Map(),
    }
    let resetDisplay = generateCardsOnBoards(12, unusedCards, cardsOnBoard, level)
    return {
        curLevel: level,
        unusedCards: resetDisplay[0],
        cardsOnBoard: resetDisplay[1],
        selectedCards: [],
        numOfSet: 0,
        result: "None"
    }
}

/* Insert a card in deck */
export function insertCard(card, cardsInfo) {
    if (cardsInfo.map.has(card.id)) {
        return _.cloneDeep(cardsInfo);
    }
    cardsInfo.list.push(card);
    cardsInfo.map.set(card.id, cardsInfo.list.length - 1);
    return _.cloneDeep(cardsInfo);
}

/* Remove a used card in deck */
export function removeCard(index, cardsInfo) {
    let card = cardsInfo.list[index];
    if (cardsInfo.list.length === 0) {
        return _.cloneDeep(cardsInfo);
    }
    cardsInfo.list[index] = cardsInfo.list[cardsInfo.list.length - 1];
    cardsInfo.list[cardsInfo.list.length - 1] = card;
    cardsInfo.map.set(cardsInfo.list[index].id, index);
    cardsInfo.map.delete(card.id);
    cardsInfo.list.pop();
    return _.cloneDeep(cardsInfo)
}

/* Random select a card from deck */
export function randomCard(list) {
    return Math.floor(Math.random() * Math.floor(list.length));
}

/* According to level, generate certain amout of card to display on game board */
export function generateCardsOnBoards(num, unusedCards, cardsOnBoard, level) {
    let newDisplay = generateCards(num, unusedCards, cardsOnBoard)
    if (level === "Medium") {
        while (evaluteAllCards(newDisplay[1])[0] === false && newDisplay[0].list.length >= 3) {
            newDisplay = generateCards(3, _.cloneDeep(newDisplay)[0], _.cloneDeep(newDisplay)[1])
        }
    }
    return newDisplay
}

/* Generate certain amout of card to display on game board */
export function generateCards(num, unusedCards, cardsOnBoard) {
    let unusedCardNum = unusedCards.list.length
    if (unusedCardNum === 0) {
        return [_.cloneDeep(unusedCards), _.cloneDeep(cardsOnBoard)];
    }
    for (let i = 1; i <= num; i++) {
        let index = randomCard(unusedCards.list);
        let card = unusedCards.list[index];
        unusedCards = removeCard(index, unusedCards);
        cardsOnBoard = insertCard(card, cardsOnBoard);
    }
    return [_.cloneDeep(unusedCards), _.cloneDeep(cardsOnBoard)];
}


/* Evaluate if selected cards are set */
export function isSet(card1, card2, card3) {
    let featureList = ["color", "number", "shape", "shade"];
    for (let feature of featureList) {
        if (check(card1, card2, card3, feature) === false) return false;
    }
    return true;
}

/* Get a card's certain feature */
export function getFeature(card, feature) {
    switch (feature) {
        case "color":
            return card.color;
        case "number":
            return card.number;
        case "shape":
            return card.shape;
        case "shade":
            return card.shade;
        default:
            return "";
    }
}

/* Given one feature, check if 3 cards are same or totally different */
export function check(card1, card2, card3, feature) {
    let featureSet = new Set();
    featureSet.add(getFeature(card1, feature));
    featureSet.add(getFeature(card2, feature));
    featureSet.add(getFeature(card3, feature));
    if (featureSet.size === 1 || featureSet.size === 3) return true;
    return false;
}

/* Evaluate if there are sets existed on game board */
export function evaluteAllCards(cardsInfo, hint) {
    const cardsList = cardsInfo.list;
    const listLen = cardsList.length;
    for (var i = 0; i < listLen - 2; i++) {
        for (var j = i + 1; j < listLen - 1; j++) {
            for (var k = i + 2; k < listLen; k++) {
                let card1 = cardsList[i];
                let card2 = cardsList[j];
                let card3 = cardsList[k];
                // If user clicks hint button, check the SET on board, and provide a suggestion
                if (isSet(card1, card2, card3)) {
                    if (hint) {
                        card1.isInHint = true
                        card2.isInHint = true
                        card3.isInHint = true
                    }
                    return [true, cardsInfo];
                }
            }
        }
    }
    return [false, cardsInfo];
}

// If selected 3 cards, determine if it is a SET, remove the 3 cards and draw 3 new cards accordingly
export function removeSet(gameState) {
    if (isSet(gameState.selectedCards[0], gameState.selectedCards[1], gameState.selectedCards[2])) {
        // remove SET cards from board
       for (let i = 2; i >= 0; i--) {
           let index = gameState.cardsOnBoard.map.get(gameState.selectedCards[i].id);
            gameState.cardsOnBoard = removeCard(index, gameState.cardsOnBoard);    
       }
       // case: medium level and the number of cards on board is larger than 12, should not draw new cards
        let addNew = [_.cloneDeep(gameState.unusedCards), _.cloneDeep(gameState.cardsOnBoard)]
        if (addNew[1].list.length >= 12) {
            if (evaluteAllCards(addNew[1], false) === false && gameState.curLevel === "Medium") {
                addNew = generateCardsOnBoards(3, gameState.unusedCards, gameState.cardsOnBoard, gameState.curLevel);
            }
        } else {
            addNew = generateCardsOnBoards(3, gameState.unusedCards, gameState.cardsOnBoard, gameState.curLevel);
        }
        gameState.unusedCards = addNew[0];
        gameState.cardsOnBoard = addNew[1];
        gameState.selectedCards = [];
        gameState.numOfSet += 1;
        gameState.result = "Set"
    } else {
        // case: if selected cards is not a SET, unhighlight them
        for (let i = 0; i < 3; i++) {
            gameState.cardsOnBoard.list[gameState.cardsOnBoard.map.get(gameState.selectedCards[i].id)].isSelected = "white"
        }
        gameState.cardsOnBoard.list = _.cloneDeep(gameState.cardsOnBoard.list)
        gameState.selectedCards = [];
        gameState.result = "Not"
    }
    return gameState;
}

// Game over
export function isFinished(unusedCards, cardsOnBoard) {
    if (cardsOnBoard.list.length > 0 && evaluteAllCards(cardsOnBoard)[0] === false && unusedCards.list.length === 0) {
        return [true, "Fail"]
    } else if (cardsOnBoard.list.length === 0) {
        return [true, "Win"]
    }
    return [false, "None"]
}