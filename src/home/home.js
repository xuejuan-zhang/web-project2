import React from 'react';
import NavBar from "../navbar";
import { connect } from 'react-redux';

/* Home that represents home page */
const Home = ({dispatch}) => {

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
                <NavBar homeActive={"home-active"} level={handleChange}/>
            </div>
                <div className="display" id="home-display">
                    <div className="welcome">Welcome to SET!</div>
                    <img id="set-image" src="../images/home-image.jpeg" alt=""></img>
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

export default connect(dispatchToPropertyMapper)(Home)