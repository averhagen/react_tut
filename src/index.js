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
    }

    createSquare(i, displayValue) {
        return <Square index={i} handleSquareClick={this.props.handleSquareClick} value={displayValue} key={"square" + i} />;
    }

    renderRow(rowIndex) {
        console.log("rendering row " + rowIndex);
        let renderedRow = [];
        for(let i=0; i < 3; i++) {
            let squareIndex = rowIndex * 3 + i;
            let displayData = this.props.gridData[squareIndex];
            renderedRow.push(this.createSquare(squareIndex, displayData))
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
        let newGridData = [...this.state.gridData];
        newGridData[clickedSquare.props.value] = "hello";
        this.setState({gridData: newGridData});
    }
    
    render() {
        return (
            <div className="game">
                {console.log("rendering game")}
                <div className="game-board">
                    <Board gridData={this.state.gridData} handleSquareClick={this.handleSquareClick} width={this.width} height={this.height}/>
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
