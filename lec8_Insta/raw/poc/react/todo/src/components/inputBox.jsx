
import React, { Component } from 'react';

class InputBox extends Component {
    state = {
        currVal: ""
    }

    setValue = (e) =>{
        let input = e.currentTarget;
        this.setState({currVal : input.value});
    }

    submitTask = () =>{
        this.props.addTask(this.state.currVal);
        this.setState({currVal : ""});
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.currVal} onChange={this.setValue}/>
                <button className="btn btn-primary" onClick={this.submitTask}>Add</button>
            </div>
        );
    }
}

export default InputBox;