import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Socket from '../sockets';
import { startGame } from '../api';
var Sound = require('react-sound').default;

export default class MasterStandby extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfPlayers: this.props.numberOfPlayers
        }

        Socket.on('updateNumberOfPlayers', function(players) {
            this.setState({
                numberOfPlayers: players
            })
        }.bind(this));

        Socket.on('startGame', function () {
            this.props.setStep(3, {});
        }.bind(this));
    }

    startGame = () => {
        if (this.state.numberOfPlayers < 2) return false;

        startGame(this.props.roomCode, this.props.adminSecret, (response) => {
            if (response.resp_code == 100) {
                this.props.setStep(3, {});
            }
        });
    }

    render() {
        return (
            <div id="root">
                <audio controls autoplay>
                    <source src="../assets/1.mp3" type="audio/mpeg"/>
                    Your browser does not support the audio element.
                </audio> 
                <div className="container" style={{paddingTop: '32px'}}>
                    <h2><green>{this.props.roomCode}</green></h2>
                </div>

                <div className="container vcenter">
                    <subtext>{this.props.setTitle}</subtext><br/>
                    <bigtext>{this.state.numberOfPlayers}</bigtext><br/>
                    <subtext>player(s)</subtext><br/>
                </div>

                <div className="container" style={{bottom: '4vh', position: 'absolute'}}>
                    <AwesomeButton type="secondary" action={this.startGame}><buttontext>start game</buttontext></AwesomeButton>
                </div>
            </div>
        );
    }
}