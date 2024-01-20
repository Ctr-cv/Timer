import React, {useState, useEffect, useRef} from 'react';

function Stopwatch(){
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElaspedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect( () => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElaspedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
        
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElaspedTime(0);
        setIsRunning(False);
    }

    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");
        
        return (
            <div className = "pl-4 pb-4">
                "{hours}:{minutes}:{seconds}:{milliseconds}";
            </div>
        );
    }

    return (
        <div className= "flex flex-col mx-auto bg-white ">
            <div className = "flex mx-auto bg-gradient-to-r from-blue-300 to-cyan-500 text-black text-3xl rounded-md border-solid border-8 border-orange-200">
                <div className = "display">{formatTime()}</div>
                <div className="controls">
                    <button onClick={start} className="start-button pl-5 pr-5 mx-auto bg-red-200 rounded-lg mt-1 ml-2">Start</button>
                    <button onClick={stop} className="stop-button pl-5 pr-5 mx-auto bg-blue-200 rounded-lg mt-1 ml-2">Stop</button>
                    <button onClick={reset} className="reset-button pl-5 pr-5 mx-auto bg-green-200 rounded-lg mt-1 ml-2">Reset</button>
                </div>
            </div>
        </div>
    );
}

export default Stopwatch