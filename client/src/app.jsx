import React from 'react';
import ReactDOM from 'react-dom'
import Column from './column.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      col1: [0, 0, 0, 0, 0, 0],
      col2: [0, 0, 0, 0, 0, 0],
      col3: [0, 0, 0, 0, 0, 0],
      col4: [0, 0, 0, 0, 0, 0],
      col5: [0, 0, 0, 0, 0, 0],
      col6: [0, 0, 0, 0, 0, 0],
      col7: [0, 0, 0, 0, 0, 0],
      turn: 'R',
      winner: null,
      R: "Red",
      Y: "Yellow",
      RW: 0,
      YW: 0,
      addScore: false
    };
    this.chooseTurn = this.chooseTurn.bind(this);
    this.placePiece = this.placePiece.bind(this);
    this.checkFour = this.checkFour.bind(this);
    this.checkHorizontal = this.checkHorizontal.bind(this);
    this.checkVertical = this.checkVertical.bind(this);
    this.checkRightLeftDiagonal = this.checkRightLeftDiagonal.bind(this);
    this.checkLeftRightDiagonal = this.checkLeftRightDiagonal.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  chooseTurn() {
    if (this.state.turn === 'R') {
      this.setState({turn: 'Y'})
    } if (this.state.turn === 'Y') {
      this.setState({turn: 'R'})
    }
  }

  checkHorizontal() {
    let columns = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'];

    const horizontalArray = (row) => {
      row = 5 - row
      let horizontalPlay = [0, 0, 0, 0, 0, 0, 0];
      let horizontalLength = 0;
      while (horizontalLength < 7) {
        horizontalPlay[horizontalLength] = this.state[columns[horizontalLength]][row]
        horizontalLength++
      }
      return horizontalPlay
    }
    for (let i = 0; i < 6; i++) {
      let horizontal = horizontalArray(i);
      this.checkFour(horizontal);
    }
  }

  checkVertical() {
    let columns = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'];

    for (let i = 0; i < 7; i++) {
      let vertical = this.state[columns[i]].slice().reverse()
      let streak = '';
      let streakNum = 0;

      for (let j = 0; j < vertical.length; j++ ){
        let circle = vertical[j]
        if (!circle) {
          break
        }
        else if (circle && streak === "") {
          streak = circle;
          streakNum = 1;
        } else if (circle && circle === streak) {
          streakNum++;
          if (streakNum === 4) {
            this.setState({winner: circle})
            this.setState({ addScore : true })
            break
          }
        } else if (circle && streak !== circle) {
          streak = circle;
          streakNum = 1;
        }
      }
    }


  }

  checkLeftRightDiagonal() {
    let columns = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'];
    const makeDiagonal = (col, row) => {
      let result = [];
      while (col < 7 && row < 6){
        result.push(this.state[columns[col]][row])
        col++
        row++
      }
      return result
    }
    let allDiagonals = [];
    allDiagonals.push(makeDiagonal(0, 2));
    allDiagonals.push(makeDiagonal(0, 1));
    allDiagonals.push(makeDiagonal(0, 0));
    allDiagonals.push(makeDiagonal(1, 0));
    allDiagonals.push(makeDiagonal(2, 0));
    allDiagonals.push(makeDiagonal(3, 0));
    allDiagonals.forEach(diagonal => this.checkFour(diagonal))
  }
  
  checkRightLeftDiagonal() {
    let columns = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'];
    const makeDiagonal = (col, row) => {
      let result = [];
      while (col >= 0 && row < 6){
        result.push(this.state[columns[col]][row])
        col--
        row++
      }
      return result
    }
    let allDiagonals = [];
    allDiagonals.push(makeDiagonal(3, 0));
    allDiagonals.push(makeDiagonal(4, 0));
    allDiagonals.push(makeDiagonal(5, 0));
    allDiagonals.push(makeDiagonal(6, 0));
    allDiagonals.push(makeDiagonal(6, 1));
    allDiagonals.push(makeDiagonal(6, 2));
    allDiagonals.forEach(diagonal => this.checkFour(diagonal))
  }

  checkFour(array) {
    let streak = '';
    let streakNum = 0;
    for (let j = 0; j < array.length; j++ ){
      let circle = array[j]
        if (!circle) {
          streak = '';
          streakNum = 0;
        }
      else if (circle && streak === "") {
        streak = circle;
        streakNum = 1;
      } else if (circle && circle === streak) {
        streakNum++;
        if (streakNum === 4) {
          this.setState({winner: circle})
          this.setState({ addScore : true })
          return
        }
      } else if (circle && streak !== circle) {
        streak = circle;
        streakNum = 1;
      }
    }
  }

  resetBoard () {
    this.setState({
      col1: [0, 0, 0, 0, 0, 0],
      col2: [0, 0, 0, 0, 0, 0],
      col3: [0, 0, 0, 0, 0, 0],
      col4: [0, 0, 0, 0, 0, 0],
      col5: [0, 0, 0, 0, 0, 0],
      col6: [0, 0, 0, 0, 0, 0],
      col7: [0, 0, 0, 0, 0, 0],
      winner: null
    })
  }

  changeValue(color) {
    let person = prompt("Please enter your name:", color);
    if (person === null || person === "") {
      person = color
    }
    this.setState({[color[0]]: person.slice(0,12)})
  }

  placePiece(column) {
    if (!this.state.winner) {
      let newColumn = this.state[column].slice();
      let index = newColumn.lastIndexOf(0);
      if (index !== -1) {
        newColumn[index] = this.state.turn;
        this.setState({[column] : newColumn})
        this.chooseTurn()
      }
    }

  }

  componentDidUpdate(){
    if (!this.state.winner) {
      this.checkHorizontal()
      this.checkVertical()
      this.checkRightLeftDiagonal()
      this.checkLeftRightDiagonal()
    } else if (this.state.winner && this.state.addScore) {
      let winnerKey = this.state.winner + 'W';
      let wins = this.state[winnerKey];
      wins++
      this.setState({
        addScore : false,
        [winnerKey] : wins
      })
    }
  }



  render() {
    let columns = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7']
    return (
      <div>
        
        <table>
          <tr><td colspan="7">

            <table width="100%"><tr>
              <td width="25%" align="center"><div id="red"></div><br></br><div onClick={() => this.changeValue('Red')}>{this.state.R}</div>Number of wins: {this.state.RW}</td>
              <td width="50%" align="center"><button onClick={this.resetBoard}>restart!</button><br></br><h1>{this.state.winner ? 'Winner! ' + this.state[this.state.winner] +'!!': this.state.turn === 'R' ? '⬅️⬅️⬅️' : '➡️➡️➡️'}</h1>
              { !this.state.winner ? this.state.turn === 'R' ? `${this.state.R}'s turn` : `${this.state.Y}'s turn.` : ''}
              </td>
              <td width="25%" align="center"><div id="yellow"></div><br></br><div onClick={() => this.changeValue('Yellow')}>{this.state.Y}</div>Number of wins: {this.state.YW}</td>
            </tr></table>

            </td></tr>
        <tr>{ columns.map((column, key) => <td><Column key={key} name={column} column={this.state[column]} placePiece = {this.placePiece}/></td>) }</tr>
        </table>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('app'));
