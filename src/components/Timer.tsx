import React, {FC, useState, useRef, useEffect} from "react";
import { Player } from "../models/Players";
import { Colors } from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {

    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    },[currentPlayer])

    function startTimer(){
        if (timer.current){
            clearInterval(timer.current)
        }

        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer(){
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer(){
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }

    return ( 
    <div>
        <div>
            <button onClick={handleRestart}>
                Restart game
            </button>
            <h2>Blacks - {blackTime}</h2>
            <h2>Whites - {whiteTime}</h2>
        </div>
    </div> );
}
 
export default Timer;