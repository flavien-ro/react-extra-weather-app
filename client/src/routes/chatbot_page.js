import React from 'react'
import {Link} from "react-router-dom";
import { useEffect } from 'react';
import '../CSS/chatbot.css';
import logo from "./assets/img/logo.png";
import linkedin from "./assets/img/linkedin.png";
import github from "./assets/img/github.png";
import Chatbot from "./chatbot";

function chatbot_page() {
        useEffect(() => {
        const toggleButton = document.getElementsByClassName('toggle-button')[0]
        const navbarLinks = document.getElementsByClassName('nav-links')[0]
        
        toggleButton.addEventListener('click', () => {
          navbarLinks.classList.toggle('active')
        })
    }, []);
    return(
        <body>
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                    <h3 className="weather">Extra weather</h3>
                </div>
                <a className="toggle-button">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                <div className="nav-links">
                    <ul>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <li><span>Home</span></li>
                        </Link> 
                        <Link to="/classic-weather" style={{textDecoration: 'none'}}>
                            <li><span>Classic</span></li>
                        </Link>
                    </ul>
                </div>
            </nav>
            <div>
                <Chatbot/>
            </div>
            <footer className="footer-home">
                <div className="footer-container">
                    <p className="copyright">&copy; Copyright flavien-ro 2020</p>
                    <div className="logo-links">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/flavien-roche"><img style={{height: "4vh"}} src={linkedin} alt="linkedin"/></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/flavien-ro/react-extra-weather-app"><img style={{height: "4vh"}} src={github} alt="github"/></a>
                    </div>
                </div>
            </footer>
        </body>
    );
}

export default chatbot_page;