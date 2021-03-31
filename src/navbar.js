import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';
import { Navbar, Nav} from 'react-bootstrap';

/* Navbar that represents the heaeder navbar */
const NavBar = ({level, homeActive, ruleActive, gameActive}) => {
    return (
        <div className="top-header">  
            <Navbar bg="rgba(247, 190, 75, 255)" id="head-navbar" expand="lg">
            {/* set logo */}
            <Navbar.Brand id="set-logo">SET</Navbar.Brand>
                {/* Navbar button that are responsive */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/home"><button className="navbar-button home-button" id={homeActive}>Home</button></Link>
                        <Link to="/rule"><button className="navbar-button" id={ruleActive}>Rule</button></Link>
                        <span className="dropdown">
                            <button className="dropbtn navbar-button" id={gameActive}>Game Level</button>
                            <div className="dropdown-content">
                                <Link to="/game" onClick={() => level("SET_LEVEL", "Easy")} >Easy</Link>
                                <Link to="/game" onClick={() => level("SET_LEVEL", "Medium")} >Medium</Link>
                                <Link to="/game" onClick={() => level("SET_LEVEL", "Hard")} >Hard</Link>
                            </div>
                        </span>
                    </Nav>       
                </Navbar.Collapse>  
            </Navbar>
        </div>         
    )
}

export default NavBar