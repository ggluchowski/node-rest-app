import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      time: 1200,
      timer: null,
    }

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.closeApp = this.closeApp.bind(this);
    this.playBell = this.playBell.bind(this);
  }

  default = {
    status: 'off',
  }

  formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
  }

  step() {
    this.setState({
      time: this.state.time - 1,
    });
    if (this.state.time === 0 && this.state.status === 'work') {
      this.playBell();
      this.setState({
        status: 'rest',
        time: 20,
      })
    } else if (this.state.time === 0 && this.state.status === 'rest') {
      this.playBell();
      this.setState({
        status: 'work',
        time: 1200,
      })
    }
  }

  startTimer() {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(() => this.step(), 1000)
    });
  }

  stopTimer() {
    this.setState({
      status: 'off',
      time: 0,
      timer: clearInterval(this.state.timer),
    });
  }

  closeApp() {
    window.close();
  }

  playBell() {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  render() {

    const { status, time } = this.state;

    return (
      <div>
        {status === 'off' &&
          <div>
            <h1>Protect your eyes</h1>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>

            <button onClick={this.startTimer} className="btn">Start</button>
          </div>
        }

        {status === 'work' &&
          <img src="./images/work.png" />
        }

        {status === 'rest' &&
          <img src="./images/rest.png" />
        }

        {status !== 'off' &&
          <div>
            <div className="timer">
              {this.formatTime(time)}
            </div>
            <button onClick={this.stopTimer} className="btn">Stop</button>
          </div>
        }

        <button onClick={this.closeApp} className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
