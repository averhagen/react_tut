import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            value: null,
        }
    }

    notifyObserversOfClick() {
        this.props.game.notifySquareClick(this);
    }

    render() {
        return (
            <button className="square" onClick={() => this.notifyObserversOfClick()}>
                {this.state.value}
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
            let square = this.createSquare(rowStartingNumber + row.length);
            console.log(square);
            row.push(square);
        }
        return row;
    }

    createSquare(i) {
        return <Square game={this.props.game} value={i} key={"square" + i} />;
    }

    renderRow(rowToRender) {
        let row = this.squares[rowToRender];
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
            )
        }
        return renderedRows;
    }

    render() {
        let renderedRows = this.renderRows();
        return (
            <div>
                {renderedRows}
            </div>
        );
    }
}

class Game extends React.Component {

    get height() {
        return 3;
    }
    
    get width() {
        return 3;
    }

    
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board game={this} width={this.width} height={this.height}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

    notifySquareClick(square) {
        square.setState({value: 'abc'});
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
