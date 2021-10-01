import React, { Component } from 'react'
import { Snake } from './components/Snake';
import { Food } from './components/Food';
// random choose food locaion
const getRandomFood = ()=>{
  // [2, 96]: [0,95)->[2, 97)->[1, 48.5]->[1,48]->[2,96]
  let max = 95;
  let min = 2;
  let x = Math.floor((Math.random() * max + min) / 2) * 2;
  let y = Math.floor((Math.random() * max + min) / 2) * 2;
  console.log("food-position",x,y)
  return [x,y]
}
// state for next use.
const initState = {
  snakeDots: [
    [0, 0],
    [2, 0]
  ],
  direction: "RIGHT",
  speed: 200,
  food:getRandomFood()
}
 
class App extends Component {
  state = initState;
  // time calculator
  componentDidMount() {
    document.onkeydown = this.onkeydown;
    setInterval(this.onMove, this.state.speed);
  }
  // getting our of range or getting food
  componentDidUpdate() {
    this.checkIfBordered();
    this.checkIfEated();
  }
  // determin keyboard input and update direction.
  onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      default:
        this.setState({ direction: "RIGHT" });
    }
 
  }
  // accroding direction to get move
  onMove = () => {
    let newSnakeDots = [...this.state.snakeDots];
    let header = newSnakeDots[newSnakeDots.length - 1];
    switch (this.state.direction) {
      case "UP":
        header = [header[0], header[1] - 2];
        break;
      case "DOWN":
        header = [header[0], header[1] + 2];
        break;
      case "LEFT":
        header = [header[0] - 2, header[1]];
        break;
      case "RIGHT":
        header = [header[0] + 2, header[1]];
        break;
      default:
        header = [header[0] + 2, header[1]];
    }
    newSnakeDots.shift();
    newSnakeDots.push(header);
    this.setState({ snakeDots: newSnakeDots })
    // console.log(this.state.snakeDots)
  }
  // determin if snake is out
  checkIfBordered = () => {
    let newSnakeDots = [...this.state.snakeDots];
    let header = newSnakeDots[newSnakeDots.length - 1];
    if (header[0] < 0 || header[0] > 98 || header[1] < 0 || header[1] > 98) {
      alert(`touch the bounder, game over, your score is：${newSnakeDots.length - 2}`);
      this.setState(initState);
    }
  }
  // determin if get the food 
  checkIfEated = ()=>{
    let newSnakeDots = [...this.state.snakeDots];
    let header = newSnakeDots[newSnakeDots.length - 1];
    if(header[0]==this.state.food[0] && header[1]==this.state.food[1]){
      console.log("You got it!")
      newSnakeDots.unshift([]);
      this.setState({snakeDots:newSnakeDots});
      this.setState({food:getRandomFood()});
    }
  }
  render() {
    return (
      <div className="App">
        <Snake snakeDots={this.state.snakeDots} />
        <Food food={this.state.food} />
      </div>
    );
  }
}
 
export default App;