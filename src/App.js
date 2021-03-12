import React from 'react';

const DEFAULT = {
    sessionLength: 25,
    breakLength: 5,
    activity: 'Session',
    current: 1500,
    timerOn: false
}

// const SESSION = {
//     activity: 'Session',

// }

let counter;

const mmssFormat = (seconds) => {
    return (seconds < 600 ? '0' : '') + Math.floor(seconds / 60) + ':' + (seconds % 60 < 10 ? '0' : '') + seconds % 60;
}

const TimeController = (props) => {
    const id = props.label.toLowerCase();
    return (
        <div className='time-control'>
            <div id={id + '-label'}>{props.label}</div>
            <button id={id + '-decrement'} onClick={props.onClick}>DOWN</button>
            <div id={id + '-length'}>{props.length}</div>
            <button id={id + '-increment'} onClick={props.onClick}>UP</button>
        </div>
    )
}

const Timer = (props) => {
    return (
        <div id="timer-wrapper">
            <div id="timer-label">{props.time}</div>
            <div id="time-left">{props.current}</div>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionLength: 25,
            breakLength: 5,
            activity: 'Session',
            current: 1500,
            timerOn: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    handleClick(e) {
        let newBreak, newSession;
        switch(e.target.id){
            case 'break-increment':
                newBreak = this.state.breakLength >= 60 ? 60 : this.state.breakLength + 1;
                this.setState(state => ({
                    breakLength: newBreak,
                    current: state.activity === 'Break' ? newBreak * 60 : state.current,
                }));
                break;
            case 'break-decrement':
                newBreak = this.state.breakLength <= 1 ? 1 : this.state.breakLength - 1;
                this.setState(state => ({
                    breakLength: newBreak,
                    current: state.activity === 'Break' ? newBreak * 60 : state.current,
                }));
                break;
            case 'session-increment':
                newSession = this.state.sessionLength >= 60 ? 60 : this.state.sessionLength + 1;
                this.setState(state => ({
                    sessionLength: newSession,
                    current: state.activity === 'Session' ? newSession * 60 : state.current,
                }));
                break;
            case 'session-decrement':
                newSession = this.state.sessionLength <= 1 ? 1 : this.state.sessionLength - 1;
                this.setState(state => ({
                    sessionLength: newSession,
                    current: state.activity === 'Session' ? newSession * 60 : state.current,
                }));
                break;
        }
    }

    toggleTimer() {
        if(this.state.timerOn){
            document.getElementById('start_stop').innerText = 'START';
            clearInterval(counter);
            this.setState({
                timerOn: false
            });
        }
        else{
            document.getElementById('start_stop').innerText = 'PAUSE';
            this.setState(state => ({
                timerOn: true
            }));

            counter = setInterval(() => {
                if(this.state.current <= 0){
                    this.setState(state => ({
                        activity: state.activity === 'Session' ? 'Break' : 'Session',
                        current: (state.activity === 'Session' ? state.breakLength : state.sessionLength) * 60
                    }));
                    /////////ring-ring
                }
                else{
                    //change color at less than 60
                    // blinker at 15

                    this.setState(state => ({
                        current: state.current - 1
                    }));
                }
            }, 1000);
        }
    }

    resetTimer() {
        document.getElementById('start_stop').innerText = 'START';
        clearInterval(counter);
        this.setState(DEFAULT);
    }

    render() {
        return (
            <div>
                <h1>25 + 5 Clock</h1>
                <TimeController label={'Break'} length={this.state.breakLength} onClick={this.handleClick} />
                <TimeController label={'Session'} length={this.state.sessionLength} onClick={this.handleClick} />
                <Timer time={this.state.activity} current={mmssFormat(this.state.current)} />
                <button id="start_stop" onClick={this.toggleTimer}>START</button>
                <button id="reset" onClick={this.resetTimer}>RESET</button>
            </div>
        )
    }
}

export default App;