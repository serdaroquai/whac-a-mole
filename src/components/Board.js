import React, { useContext, useEffect } from "react";
import Square from "./Square";
import { RxJsContext } from "../App";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";


const toRandom = () => Math.floor(Math.random() * 9);
export const GAME_UNIT_TIME = 500;
export const GAME_LENGTH = 10;

export default function Board(props) {

    const [{ tick$ }, dispatch] = useContext(RxJsContext);

    // register a click$ which squares will send their click events
    useEffect(() => {
        dispatch({
            key: "click$",
            value: new Subject()
        });
    }, [dispatch]);

    // register a tick$ 
    useEffect(() => {
        dispatch({
            key: "tick$",
            value: new Subject()
        });
    }, [dispatch]);

    // register random value generator
    useEffect(() => {
        if (tick$) {
            const random$ = new Subject();
            const sub = map(toRandom)(tick$).subscribe(random$)
            dispatch({
                key: "random$",
                value: random$
            });
            return () => sub.unsubscribe();
        }
    }, [tick$, dispatch]);

    return (
        <div>
            <div className="board-row">
                <Square id={0}></Square>
                <Square id={1}></Square>
                <Square id={2}></Square>
            </div>
            <div className="board-row">
                <Square id={3}></Square>
                <Square id={4}></Square>
                <Square id={5}></Square>
            </div>
            <div className="board-row">
                <Square id={6}></Square>
                <Square id={7}></Square>
                <Square id={8}></Square>
            </div>
        </div>
    )
}