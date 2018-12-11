import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={() => this.props.handleSquareClick(this)}>
                {console.log("rendering square: " + this.props.index + " with value " + this.props.value)}
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {

    createSquare(i, displayValue) {
        return <Square
            index={i}
            handleSquareClick={this.props.handleSquareClick}
            value={displayValue}
            key={"square" + i} />;
    }

    renderRow(rowIndex) {
        console.log("rendering row " + rowIndex);
        let renderedRow = [];
        for (let i = 0; i < this.props.width; i++) {
            let squareIndex = rowIndex * this.props.width + i;
            let displayData = this.props.gridData[squareIndex];
            renderedRow.push(this.createSquare(squareIndex, displayData));
        }
        return renderedRow;
    }

    renderRows() {
        let renderedRows = [];
        for (let i = 0; i < this.props.height; i++) {
            let key = "row" + i;
            renderedRows.push(
                <div className="board-row" key={key}>
                    {this.renderRow(i)}
                </div>
            );
        }
        return renderedRows;
    }

    render() {
        return (
            <div>
                {console.log("rendering rows")}
                {this.renderRows()}
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            turnNumber: 0,
            gridData: this.blankGrid,
        }
        this.handleSquareClick = this.handleSquareClick.bind(this);
    }

    get blankGrid() {
        let blankGrid = [];
        for (let i = 0; i < this.props.width * this.props.height; i++) {
            blankGrid.push(this.props.startingValue);
        }
        return blankGrid;
    }

    handleSquareClick(clickedSquare) {
        if (!this.isSquareClicked(clickedSquare)) {
           this.markSquare(clickedSquare);
           this.incrementTurn();
           console.log(this.state);
        }
    }

    isSquareClicked(square) {
        return square.props.value !== this.props.startingValue;
    }

    markSquare(square) {
        let newGridData = [...this.state.gridData];
        newGridData[square.props.index] = this.getCurrentGameMarker();
        this.setState(
            {
                gridData: newGridData,
            }
        );
    }

    getCurrentGameMarker() {
        let playersTurn = this.state.turnNumber % this.props.playerMarkers.length;
        return this.props.playerMarkers[playersTurn];
    }

    incrementTurn() {
        this.setState(
            {
                turnNumber: this.state.turnNumber + 1,
            }
        );
    }

    render() {
        return (
            <div className="game">
                {console.log("rendering game")}
                <div className="game-board">
                    <Board
                        gridData={this.state.gridData}
                        handleSquareClick={this.handleSquareClick}
                        width={this.props.width}
                        height={this.props.height} />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game playerMarkers={["x", "o"]} width={3} height={3} startingValue={""} />,
    document.getElementById('root')
);
