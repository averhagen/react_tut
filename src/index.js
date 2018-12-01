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

    click() {
        this.setState({value: 'X'});
    }

    render() {
        return (
            <button className="square" onClick={() => this.click()}>
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
            row.push(this.createSquare(rowStartingNumber + row.length))
        }
        return row;
    }

    createSquare(i) {
        return <Square value={i} key={"square" + i} />;
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
                    <Board width={this.width} height={this.height}/>
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
