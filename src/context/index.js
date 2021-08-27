import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    stage: 1,
    players: [],
    result: '',
  };

  addPlayers = (player) => {
    this.setState((prevState) => ({
      players: [...prevState.players, player],
    }));
  };

  removePLayer = (idx) => {
    let newArray = this.state.players;
    newArray.splice(idx, 1);
    this.setState((prevState) => ({
      players: newArray,
    }));
  };
  nextHandler = () => {
    const { players } = this.state;
    if (players.length < 2) {
      toast.error('You need more than one player', {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    } else {
      this.setState(
        {
          stage: 2,
        },
        () => {
          setTimeout(() => {
            this.generateLooser();
          }, 2000);
        }
      );
    }
  };

  generateLooser = () => {
    const { players } = this.state;
    this.setState(() => ({
      result: players[Math.floor(Math.random() * players.length)],
    }));
  };

  resetGame = () => {
    this.setState({
      stage: 1,
      players: [],
      result: '',
    });
  };

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            addPlayer: this.addPlayers,
            removePlayer: this.removePLayer,
            next: this.nextHandler,
            getNewLooser: this.generateLooser,
            startOver: this.resetGame,
          }}
        >
          {this.props.children}
        </MyContext.Provider>
        <ToastContainer />
      </>
    );
  }
}

export { MyContext, MyProvider };
