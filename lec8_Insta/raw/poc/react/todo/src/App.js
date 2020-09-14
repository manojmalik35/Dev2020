import './App.css';
//imrc
import React, { Component } from 'react';
import TaskList from './components/taskList';
import InputBox from "./components/inputBox";

//cc
class App extends Component {

  state = {
    tasks: [
      { id: "1", name: "Learn Node" },
      { id: "2", name: "Learn JavaScript" },
      { id: "3", name: "Learn React" }
    ]
  }

  removeTask = (removeId) => {
    let remainingTasks = this.state.tasks.filter((task) => {
      return task.id !== removeId;
    })

    this.setState({ tasks: remainingTasks });
  }

  addTask = (taskName) =>{
      let {tasks} = this.state;
      tasks.push({id : tasks.length + 1, name : taskName});
      this.setState({tasks : tasks});
  }

  render() {
    return (
      <React.Fragment>
        <InputBox addTask={this.addTask}></InputBox>
        <TaskList list={this.state.tasks} rTask={this.removeTask}></TaskList>
      </React.Fragment>
    );

  }

}

export default App;
