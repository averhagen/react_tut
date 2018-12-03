import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={() => this.props.handleSquareClick(this)}>
                {console.log("rendering square: " + this.props.index)}
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.initSquares();
    }

    initSquares() {
        this.squares = [];
        let numberOfSquaresAdded = this.squares.length;
        for(let width=0; width < this.props.width; width++) {
            let row = this.createRowOfSquares(numberOfSquaresAdded);
            this.squares.push(row);
            numberOfSquaresAdded += row.length;
        }
    }

    createRowOfSquares(rowStartingNumber) {
        let row = [];
        for(let width=0; width < this.props.width; width++) {
            let squareIndex = rowStartingNumber + row.length;
            let squareValue = this.props.displayData;
            let square = this.createSquare(squareIndex, squareValue);
            row.push(square);
        }
        return row;
    }

    createSquare(i, displayValue) {
        return <Square index={i} handleSquareClick={this.props.handleSquareClick} value={displayValue} key={"square" + i} />;
    }

    renderRow(rowIndex) {
        console.log("rendering row " + rowIndex);
        let row = this.squares[rowIndex];
        let renderedRow = [];
        for(let i=0; i < row.length; i++) {
            let square = row[i];
            renderedRow.push(square);
        }
        return renderedRow;
    }
    
    renderRows() {
        let renderedRows = [];
        for(let i=0; i < this.props.height; i++) {
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
            gridData: this.blankGrid,
            displayData: "a"
        }
        this.handleSquareClick = this.handleSquareClick.bind(this);
    }

    get blankValue() {
        return null;
    }

    get height() {
        return 3;
    }
    
    get width() {
        return 3;
    }

    get blankGrid() {
        let blankGrid = [];
        for(let i = 0; i < this.width * this.height; i++) {
            blankGrid.push(i);
        }
        return blankGrid;
    }
    
    handleSquareClick(clickedSquare) {
        this.setState({displayData: "b"});
        // let newGridData = [...this.state.gridData];
        // newGridData[clickedSquare.props.value] = "hello";
        // this.setState({gridData: newGridData});
        // console.log(this.state.gridData);
    }
    
    render() {
        return (
            <div className="game">
                {console.log("rendering game")}
                <div className="game-board">
                    <Board displayData={this.state.displayData} handleSquareClick={this.handleSquareClick} width={this.width} height={this.height}/>
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
    <Game />,
    document.getElementById('root')
);
