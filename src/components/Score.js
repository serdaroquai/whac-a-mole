import React, { useState, useContext, useEffect, useRef } from "react";
import { RxJsContext } from "../App";
import { BehaviorSubject, fromEvent, interval } from "rxjs";
import { scan, distinctUntilChanged, switchMap, take, sample, map } from "rxjs/operators";
import { GAME_UNIT_TIME, GAME_LENGTH } from "./Board";

export default function Score(props) {

    const startBtn = useRef(null);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [{ score$, tick$ }, dispatch] = useContext(RxJsContext);

    useEffect(() => {
        dispatch({
            key: "score$",
            value: new BehaviorSubject(0)
        });
    }, [dispatch]);

    useEffect(() => {
        if (tick$ && score$) {
            const subs = [];

            const startNew$ = fromEvent(startBtn.current, 'click');
            const cumulativeScore$ = scan((acc, val) => acc + val, 0)(score$);
            const bestScore$ = cumulativeScore$.pipe(
                scan((acc, val) => Math.max(acc, val), 0),
                distinctUntilChanged()
            );
            const resetScoreOffset$ = cumulativeScore$.pipe(
                sample(startNew$),
                map(value => -value)
            )

            subs.push(resetScoreOffset$.subscribe(score$));
            subs.push(startNew$.pipe(switchMap(() => take(GAME_LENGTH)(interval(GAME_UNIT_TIME)))).subscribe(tick$));
            subs.push(cumulativeScore$.subscribe(x => setScore(x)));
            subs.push(bestScore$.subscribe(val => setBestScore(val)));
            return () => subs.forEach(sub => sub.unsubscribe());
        }
    }, [startBtn, tick$, score$, dispatch]);

    return (
        <>
            <button ref={startBtn}>Start new game</button>
            <h3>Score: {score}</h3>
            <h3>Best: {bestScore}</h3>
        </>
    )
}