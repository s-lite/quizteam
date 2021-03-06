import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Card from './Card';
import Socket from '../sockets';

export default class MasterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: this.props.cards,
            score: 0
        }

        Socket.on('initialCards', function(cards) {
            this.setState({
                cards: cards
            })
            console.log(cards)
        }.bind(this))

        Socket.on('swapCards', function(oldcard, newcard) {
            let newCards = this.state.cards.slice();
            for (var index in newCards) {
                if (newCards[index].index == oldcard) {
                    newCards[index] = newcard;
                    break;
                }
            }
            var newScore = this.state.score + 10;
            this.setState({
                cards: newCards,
                score: newScore
            })
        }.bind(this));

        Socket.on('updateScore', function(newScore) {
            console.log('new score received ' + newScore);
            this.setState({
                score: newScore
            });
            
        }.bind(this))
    }

    render() {
        return (
            <div id="root">
                <div className="container" style={{ width: '90%', height: '20%'}}>
                    <h2><green>score: {this.state.score}</green></h2>
                </div>

                <div className="container" style={{ width: '90%', height: '30%'}}>
                    <Card text={this.state.cards[0] != null && this.state.cards[0].definition}/>
                    <Card text={this.state.cards[1] != null && this.state.cards[1].definition}/>
                </div>

                <div className="container" style={{ width: '90%', height: '30%', marginTop: '5%', marginBottom: '5%' }}>
                    <Card text={this.state.cards[2] != null && this.state.cards[2].definition}/>
                    <Card text={this.state.cards[3] != null && this.state.cards[3].definition}/>
                </div>
            </div>
        );
    }
}