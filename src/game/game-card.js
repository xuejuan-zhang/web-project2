import React from 'react';
import { connect } from 'react-redux';

// Card of the game
const Card = ({ card, select, hover, leave}) => {
    const number = card.number
    const color = card.color
    const shape = card.shape
    const shade = card.shade

    // Determine how many of shapes on a cetrain card
    const numOfItemOnCard = () => {
        let numOfItem = "three-items"
        if (number === 1) {
            numOfItem = "one-item"
        } else if (number === 2) {
            numOfItem = "two-items"
        }
        return numOfItem;
    }

    // Draw card that has square(also named oval) shape
    const drawSquareCard = () => {
        let svgs = []
        const patternId = color + number + shade + shape;
        for (let i = 0; i < number; i++) {
            switch (shade) {
                case "none":
                    svgs.push(
                        <svg className={numOfItemOnCard()} width="140" height="170" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="23" rx="15" width="30px" height="70px" stroke={color} fill="none" strokeWidth="2" />
                        </svg>)
                    break;
                case "line":
                    svgs.push(
                        <svg className={numOfItemOnCard()} width="140" height="170" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id={patternId} width="7.5%" height="7.5%" stroke={color}>
                                    <line x1="0" y1="0" x2="150" y2="0" strokeWidth="4" />
                                </pattern>
                            </defs>
                            <rect x="5" y="23" rx="15" width="30px" height="70px" fill={"url(#" + patternId + ")"}
                                stroke={color} strokeWidth="2" />
                        </svg>
                    )
                    break;
                case "color":
                    svgs.push(
                        <svg className={numOfItemOnCard()} width="140" height="170" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="23" rx="15" width="30px" height="70px" fill={color} strokeWidth="2" />
                        </svg>)
                    break;
                default:
                    return
            }
        }
        return svgs;
    }

    // Draw card that has triangle shape
    const drawTriangleCard = () => {
        let svgs = []
        const patternId = color + number + shade + shape;
        for (let i = 0; i < number; i++) {
            switch (shade) {
                case "none":
                    svgs.push(
                        <svg className={numOfItemOnCard()} width="140" height="170" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="2,40  36,40  20,90" stroke={color} fill="none" strokeWidth="2" />
                        </svg>)
                    break;
                case "line":
                    svgs.push(
                        <svg className={numOfItemOnCard()} width="140" height="170" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id={patternId} width="9.3%" height="9.3%" stroke={color}>
                                    <line x1="0" y1="0" x2="100" y2="0" strokeWidth="4" />
                                </pattern>
                            </defs>
                            <polygon points="2,40  36,40  20,90" fill={"url(#" + patternId + ")"}
                                stroke={color} strokeWidth="2" />
                        </svg>
                    )
                    break;
                case "color":
                    svgs.push(
                        <svg className={numOfItemOnCard()} width="140" height="170" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="2,40  36,40  20,90" fill={color} strokeWidth="2" />
                        </svg>)
                    break;
                default:
                    return
            }
        }
        return svgs;
    }

    // Draw card that has circle shape
    const drawCircleCard = () => {
        let svgs = []
        const patternId = color + number + shade + shape;
        for (let i = 0; i < number; i++) {
            switch (shade) {
                case "none":
                    svgs.push(
                        <svg className={numOfItemOnCard()} width="140" height="170" xmlns="http://www.w3.org/2000/svg">
                            <circle className="circle" cx="20" cy="60" r="18" stroke={color} fill="none" strokeWidth="2" />
                        </svg>)
                    break;
                case "line":
                    svgs.push(
                        <svg className={numOfItemOnCard()} width="140" height="170" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id={patternId} width="15%" height="15%" stroke={color}>
                                    <line x1="0" y1="0" x2="100" y2="0" strokeWidth="4" />
                                </pattern>
                            </defs>
                            <circle cx="20" cy="60" r="18" fill={"url(#" + patternId + ")"}
                                stroke={color} strokeWidth="2" />
                        </svg>)
                    break;
                case "color":
                    svgs.push(
                        <svg className={numOfItemOnCard()} width="140" height="170" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="60" r="18" fill={color} />
                        </svg>)
                    break;
                default:
                    return
            }
        }
        return svgs;
    }

    // Draw different shapes of card
    const drawCard = () => {
        switch (shape) {
            case "square":
                return drawSquareCard()
            case "triangle":
                return drawTriangleCard()
            case "circle":
                return drawCircleCard()
            default:
                return
        }
    }

    return (   
            <div id={card.id} className="card" 
                onMouseOver={() => hover(card)} onMouseLeave={() => leave(card)} onClick={() => {select(card);}}  
                style={{backgroundColor: card.isSelected, border: card.isInHint ? "3px solid red" : "2px solid grey"}}>
                <div className="card-content" key={card.id}>
                    {drawCard()}
                </div>
            </div>
    )
}

const stateToPropertyMapper = (state) => {
    return {
        currentGameSate: state,
    }
}
export default connect(stateToPropertyMapper)(Card)

