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
            turnNumber: 0,
            gridData: this.blankGrid,
        }
        this.handleSquareClick = this.handleSquareClick.bind(this);
    }

    get blankValue() {
        return null;
    }

    get blankGrid() {
        let blankGrid = [];
        for(let i = 0; i < this.props.width * this.props.height; i++) {
            blankGrid.push(i);
        }
        return blankGrid;
    }
    
    handleSquareClick(clickedSquare) {
        let newGridData = [...this.state.gridData];
        let currentMarker = this.props.playerMarkers[this.state.turnNumber % this.props.playerMarkers.length];
        newGridData[clickedSquare.props.value] = currentMarker;
        let newTurnNumber = this.state.turnNumber + 1;
        this.setState({gridData: newGridData, turnNumber: newTurnNumber});
        console.log(this.state);
    }
    
    render() {
        return (
            <div className="game">
                {console.log("rendering game")}
                <div className="game-board">
                    <Board gridData={this.state.gridData} handleSquareClick={this.handleSquareClick} width={this.props.width} height={this.props.height}/>
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
    <Game playerMarkers={["x","o"]} width={3} height={3} />,
    document.getElementById('root')
);
