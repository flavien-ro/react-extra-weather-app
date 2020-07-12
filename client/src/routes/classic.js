import React, { Component } from 'react'
import '../CSS/classic.css';
import axios from 'axios';

function get_first_chars(str) {
    var res = String(str).substring(0, 2);
    return (res)
}

class Classic extends Component {
    constructor(props) {
        super(props)
        this.state = {
          messages: [],
          result: "",
          icon: "Clouds.png",
          error: "",
        }
    }
    componentDidMount = () => {
        this.input.focus()
    }
    handleFormSubmit = (event) => {
        event.preventDefault()
        this.handleInput(this.input.value)
        this.input.value = ""
    }

    handleInput = (input) => {
        const card = document.getElementsByClassName('place-classic')[0];
        const error = document.getElementById("city-weather");
        const get_coord = card.getBoundingClientRect();
        console.log(get_coord.left)
        if (get_coord.left === 0) {
            card.classList.toggle('active-card');
        }
        this.setState({
            messages: [...this.state.messages, {body: input}],
        })
        let temp = {
            msg: input
        };
        axios.post('https://server-react-weather-app.herokuapp.com/getClassic',{temp})
            .then(res =>{
                console.log('res.data: ', res);
                if (res.data['message'] === "city not found") {
                    this.setState({
                        messages: [...this.state.messages, {body: "I don't know this city :("}],
                        result: null,
                        icon: "Clouds.png",
                        error: "Please enter a valid City",
                    })
                    console.log("NOT FOUND")
                }
                else {
                    card.classList.toggle('active-card');
                    this.setState({
                        messages: [...this.state.messages, {
                        body: "The temperature of " + res.data['city']['name'] + " is " + res.data['list']['0']['main']['temp'] +
                        "°, if you want more information see the card", class: "chat friend"}],
                        result: res.data,
                        icon: res.data['list']['0']['weather']['0']['main'],
                        error: null
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
	render() {
        const result = this.state.result
        const icon = "./assets/img/" + this.state.icon +".png"
        const error = this.state.error
        var now = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";
        function MeteoCard () {
            if (result) {
                return (
                        <div className="card">
                            <h2>{result['city']['name']}</h2>
                                <h3>{result['list']['0']['weather']['0']['main']}<span>Wind {result['list']['0']['wind']['speed']} km/h<span class="dot">•</span></span></h3>
                                <h1>{String(result['list']['0']['main']['temp']).substring(0, 4)}°</h1>
                                <div style={{marginTop: "35px"}}>
                                    <img src={require("./assets/img/Clear.png")} width="120" height="120" alt="icon"/>
                                </div>
                                <table>
                                    <tr>
                                        <td>{weekday[((now.getDay() + 1) % 7) || 0]}</td>
                                        <td>{weekday[((now.getDay() + 2) % 7) || 0]}</td>
                                        <td>{weekday[((now.getDay() + 3) % 7) || 0]}</td>
                                        <td>{weekday[((now.getDay() + 4) % 7) || 0]}</td>
                                        <td>{weekday[((now.getDay() + 5) % 7) || 0]}</td>
                                    </tr>
                                    <tr>
                                        <td>{get_first_chars(result['list']['1']['main']['temp_max'])}°</td>
                                        <td>{get_first_chars(result['list']['2']['main']['temp_max'])}°</td>
                                        <td>{get_first_chars(result['list']['3']['main']['temp_max'])}°</td>
                                        <td>{get_first_chars(result['list']['4']['main']['temp_max'])}°</td>
                                        <td>{get_first_chars(result['list']['5']['main']['temp_max'])}°</td>
                                    </tr>
                                    <tr>
                                        <td>{get_first_chars(result['list']['1']['main']['temp_min'])}°</td>
                                        <td>{get_first_chars(result['list']['2']['main']['temp_min'])}°</td>
                                        <td>{get_first_chars(result['list']['3']['main']['temp_min'])}°</td>
                                        <td>{get_first_chars(result['list']['4']['main']['temp_min'])}°</td>
                                        <td>{get_first_chars(result['list']['5']['main']['temp_min'])}°</td>
                                    </tr>
                                </table>
                        </div>
                )
            } else {
                return null;
            }
        }
        function City_error () {
            if (error) {
                return (
                    <form className="form-inline">
                        <div className="title-classic">
                            <h3 style={{opacity: 0}}>Classic Version: </h3>
                        </div>
                        <div id="city-weather" className="form-group mb-2 input-get-weather">
                            <div className="error">{error}</div>
                        </div>
                    </form>
                )
            } else {
                return null; 
            }
        }
        return (
            <body className="main-classic">
                <div className="header-classic">
                    <form className="form-inline" onSubmit={this.handleFormSubmit}>
                        <div className="title-classic">
                            <h3>Classic Version: </h3>
                        </div>
                        <div id="city-weather" className="form-group mb-2 input-get-weather">
                            <input ref={(node) => (this.input = node)} type="text" className="form-control" placeholder="Enter a city here ..."/>
                        </div>
                        <div className="btn-parent">
                            <button type="submit" className="btn btn-primary mb-2 btn-get-weather">Get Weather</button>
                        </div>
                    </form>
                    <City_error/>
                </div>
                <div className="place-classic">
                    <MeteoCard/>
                </div>
            </body>
        )
    }
}

export default Classic;