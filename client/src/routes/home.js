import React from 'react';
import {Link} from "react-router-dom";
import '../CSS/home.css';
import { useEffect } from 'react';
import logo from "./assets/img/logo.png";
import linkedin from "./assets/img/linkedin.png"
import github from "./assets/img/github.png"
import Chabot_video from "./assets/videos/chabot_video.mp4"
import Chatbot_ogg from "./assets/videos/chatbot_ogg.ogg"
import Chatbot from "./assets/videos/chatbot.webm"
import Classic_mp4 from "./assets/videos/Classic_version.mp4"
import Classic_ogg from "./assets/videos/Classic_version.ogg"
import Classic_webm from "./assets/videos/Classic_version.webm"
import Clock from 'react-live-clock';

function scroll_how_to() {
    var element_resp = document.querySelector("#resp");
    var element_main = document.querySelector("#main");
    console.log(screen.width);
    if (screen.width < 980) {
        element_resp.scrollIntoView({ behavior: 'smooth', block: 'start'});
    } else {
        element_main.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
};

function Home() {
    useEffect(() => {
        const toggleButton = document.getElementsByClassName('toggle-button')[0]
        const navbarLinks = document.getElementsByClassName('nav-links')[0]
        const video = document.getElementById('vidId');
        const video2 = document.getElementById('vidId2');
        const btn_htw = document.getElementById('btn-htw');
        btn_htw.addEventListener('click', () => {
            video.load();
            video2.load();
        })
        toggleButton.addEventListener('click', () => {
          navbarLinks.classList.toggle('active')
        })
        window.addEventListener('scroll', () => {
            var bounding = video.getBoundingClientRect();
            if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight) {
                video.play();
                video2.play();
                console.log('Element is in the viewport!');
            } else {
                video.pause()
                video2.pause();
                console.log('Element is NOT in the viewport!');
            }
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
                        <Link to="/chatbot" style={{textDecoration: 'none'}}>
                            <li><span>Chatbot</span></li>
                        </Link>
                        <Link to="/classic-weather" style={{textDecoration: 'none'}}>
                            <li><span>Classic</span></li>
                        </Link>
                    </ul>
                </div>
            </nav>
            <section className="section-home">
                <div className="pres-text">
                    <div className="presentation">
                        <h1 className="presentation-text">Extra weather application, Chatbot or Classic?</h1>
                        <h3 className="under-title">You have 2 options : Ask the weather to the chatbot or
                            enter a city in the the classic version
                        </h3>
                        <div className="button-how-to-use">
                            <button id="btn-htw" className="how-to-use"> <a onClick={scroll_how_to}>How to use</a></button>
                        </div>
                    </div>
                </div>
                <div className="place-card">
                    <div className="card size-card">
                        <h2>Brussels</h2>
                        <h3>Cloudy<span>Wind 10km/h <span className="dot">•</span></span></h3>
                        <h1>23°</h1>
                        <h3><Clock format={'HH:mm'} ticking={true} timezone={'Europe/Brussels'} /></h3>
                        <div className="sky">
                            <div className="sun"></div>
                            <div className="cloud">
                                <div className="circle-small"></div>
                                <div className="circle-tall"></div>
                                <div className="circle-medium"></div>
                            </div>
                        </div>
                        <table>
                            <tr>
                                <td>TUE</td>
                                <td>WED</td>
                                <td>THU</td>
                                <td>FRI</td>
                                <td>SAT</td>
                            </tr>
                            <tr>
                                <td>30°</td>
                                <td>34°</td>
                                <td>36°</td>
                                <td>34°</td>
                                <td>37°</td>
                            </tr>
                            <tr id="resp">
                                <td>17°</td>
                                <td>22°</td>
                                <td>19°</td>
                                <td>23°</td>
                                <td>19°</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </section>
            <main className="main-home">
                <div className="title" id="main">
                    <div>
                        <h3 style={{textAlign: 'center'}}>Chatbot version:</h3>        
                        <div className="vids">
                            <video id="vidId" autoPlay loop muted  width="563" height="317" controls="controls" preload="auto" poster="./assets/img/poster.png">
                                <source src={Chabot_video} type="video/mp4" />
                                <source src={Chatbot} type="video/webm" />
                                <source src={Chatbot_ogg} type="video/ogg" />
                            </video>
                        </div>
                    </div>                  
                    <div className="classic-card">
                        <h3 style={{textAlign: 'center'}}>Classic version:</h3>
                        <div className="vids">
                            <video id="vidId2" autoPlay loop muted  width="563" height="317" controls="controls" preload="auto" poster="./assets/img/poster.png">
                                <source src={Classic_mp4} type="video/mp4" />
                                <source src={Classic_webm} type="video/webm" />
                                <source src={Classic_ogg} type="video/ogg" />
                            </video>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer-home">
                <div className="footer-container">
                    <p className="copyright">&copy; Copyright flavien-ro 2020</p>
                    <div className="logo-links">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/flavien-roche"><img style={{height: "4vh"}} src={linkedin} alt="linkeding"/></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/flavien-ro/react-extra-weather-app"><img style={{height: "4vh"}} src={github} alt="github"/></a>
                    </div>
                </div>
            </footer>
        </body>
    );
}

export default Home;