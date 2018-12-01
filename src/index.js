import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    
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

    constructor() {
        super();
        this.rows = [];
    }

    renderSquare(i) {
        return <Square value={i} />;
    }

    createRow(rowStartingNumber) {
        let row = [];
        for(let width=0; width < this.props.width; width++) {
            row.push(this.renderSquare(rowStartingNumber + width))
        }
        return row;
    }

    createRows() {
        this.rows = [];
        for(let width=0; width < this.props.width; width++) {
            this.rows.push(
                <div className="board-row">
                    {this.createRow(width * this.props.height)}
                </div>
            )
        }   
        return this.rows;
    }

    render() {
        return (
            <div>
                {this.createRows()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.width;
        this.height;
    }

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
