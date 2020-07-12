import React, { Component } from 'react'
import '../CSS/chatbot.css';
import MessageForm from "./message_form"
import MessageList from "./messages_list"
import axios from 'axios';
import Robot from "./assets/img/friend.png"

function get_first_chars(str) {
    var res = String(str).substring(0, 2);
    return (res)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Chatbot extends Component {
    constructor(props) {
        super(props)
        this.state = {
          messages: [],
          result: "",
          icon: "Clouds.png"
        }
      }
    
    handleNewMessage = (text) => {
        this.setState({
            messages: [...this.state.messages, {body: text, class: "self"}],
        })
        let temp = {
            msg: text
        };
        axios.post(' https://server-react-weather-app.herokuapp.com/getReply',{temp})
            .then(res =>{
                console.log('res.data: ', res);
                if (res.data['message'] === "city not found") {
                    this.setState({
                        messages: [...this.state.messages, {body: "I don't know this city :(", class: "friend"}],
                        icon: "Clouds.png",
                        result: null,
                    })
                    console.log("NOT FOUND")
                }
                else {
                    this.setState({
                        messages: [...this.state.messages, {
                        body: "The temperature of " + res.data['city']['name'] + " is " + res.data['list']['0']['main']['temp'] +
                        "°, if you want more information see the card", class: "friend"}],
                        result: res.data,
                        icon: res.data['list']['0']['weather']['0']['main'],
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

	render() {
        const result = this.state.result
        const icon = "./assets/img/" + this.state.icon + ".png"
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
                                    <img src={require(icon)} width="120" height="120"/>
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
        return (
            <body className="main-chatbot">
                <div className="title-chatbot">
                    <h1>Chatbot Version:</h1>
                </div>
                <div className="card">
                    <div className="chatlogs">
                        <div className="chat friend">
                            <div className="user-photo"><img src={Robot} width="30" height="30"/></div>
                            <p className="chat-message">Hello ask me the weather of a specific city :)</p>
                        </div>
                            <MessageList messages={this.state.messages}/>
                    </div>
                    <MessageForm onMessageSend={this.handleNewMessage}/>
                </div>
                <MeteoCard/>
            </body>
        )
    }
}

export default Chatbot;