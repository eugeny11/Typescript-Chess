import React, {FC, useState, useEffect} from 'react'
import { Board } from "../models/Board";
import { Cell } from '../models/Cell';
import { Player } from '../models/Players';
import CellComponent from "./CellComponent";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer : () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
   
    function click(cell: Cell){
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
            updateBoard();
        } else {
            if (cell.figure?.color === currentPlayer?.color){
            setSelectedCell(cell)
            }
            
        }
    }

    useEffect(() => {
        highLightCells()
    },[selectedCell])

    function highLightCells(){
        board.hightLightCells(selectedCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return ( 
        <div>
            <h3>Current player is {currentPlayer?.color}</h3>
            <div className="board">
            {board.cells.map((row, index) => {
               return <React.Fragment key={index}>
                    {row.map(cell =>
                    <CellComponent 
                        cell={cell} 
                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                        key={cell.id}
                        click={click}
                    />
                    )
                    }
                </React.Fragment>
            })}
        </div>
        </div>
        
     );
}
 
export default BoardComponent;