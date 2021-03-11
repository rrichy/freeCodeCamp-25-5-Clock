import React from 'react';

// const SESSION = {label: 'Session', }

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
            current: 25 * 60,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log(e.target.id)
    }

    render() {
        return (
            <div>
                <h1>25 + 5 Clock</h1>
                <TimeController label={'Break'} length={this.state.breakLength} onClick={this.handleClick} />
                <TimeController label={'Session'} length={this.state.sessionLength} onClick={this.handleClick} />
                <Timer time={this.state.activity} current={this.state.current} />
            </div>
        )
    }
}

export default App;