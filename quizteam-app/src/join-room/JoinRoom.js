import React, { Component } from 'react';
import Socket from '../sockets';

import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class JoinRoom extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            roomCode: ''
        }

        Socket.on('setRoomResponse', function(msg) {
            if (msg == 'success') {
                this.props.setStep(5, {roomCode: this.state.roomCode});
            }
            //TODO: error message
        }.bind(this));
        //TODO: remove listeners when component will unmount
    }

    joinRoom = () => {
        Socket.emit('setRoom', this.state.roomCode)
    }
    
    back = () => {
      this.props.setStep(0, {
        roomCode: null,
        numberOfPlayers: null,
        setTitle: null,
        cards: null,
        adminSecret: null
      });
    }

    handleChange = (e) => {
        this.setState({
            roomCode: e.target.value
        })
    }

    render() {
        return (
            <div>
              <AwesomeButton type="secondary" style={{ marginTop: '32px', marginLeft: '32px' }} action={this.back}><buttontext>go back</buttontext></AwesomeButton>
                <div className="container vcenter">
                  <h2><blue>join room</blue></h2>
                  <div>
                      <input class="blue-input" placeholder="room number" onChange={this.handleChange} value={this.state.roomCode} style={{width: '30%'}}/>
                  </div>
                  <AwesomeButton type="primary" style={{ marginTop: '32px' }} action={this.joinRoom}><buttontext>join room</buttontext></AwesomeButton>
              </div>
            </div>
        );
    }
}