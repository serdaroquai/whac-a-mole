import React, { useRef, useEffect, useContext, useState } from "react";
import { fromEvent, merge } from "rxjs";
import { RxJsContext } from "../App";
import { sample, mapTo , filter, distinctUntilChanged, timestamp, pairwise, map} from "rxjs/operators";
import { GAME_UNIT_TIME } from "./Board";


export default function Square({ id }) {

    const button = useRef(null);
    const [{ click$, random$, score$ }] = useContext(RxJsContext);
    const [isActive, setActive] = useState(false);

    useEffect(()=>{
        if (click$ && random$) {
            const subs = [];

            const activateSignals$ = random$.pipe(filter(val => val === id),mapTo(true))
            const deactiveSignals$ = merge(
                random$.pipe(filter(val => val !== id),mapTo(false)),
                click$.pipe(filter(val => val === id),mapTo(false))
            )
            
            const active$ = merge(
                activateSignals$,
                deactiveSignals$
            ).pipe(
                distinctUntilChanged()
            );

            const scoreOffset$ = timestamp()(random$).pipe(
                sample(filter(val => val === false)(active$)),
                map(s => s.timestamp),
                timestamp(),
                map(v => v.timestamp - v.value),
                filter(v => v>5),
                map(v => GAME_UNIT_TIME - v)
            );
            
            
            subs.push(active$.subscribe(bool => setActive(bool)));
            subs.push(scoreOffset$.subscribe(score$));
            
            return () => subs.forEach(sub => sub.unsubscribe());
        }
    },[click$, random$, id]);

    useEffect(() => {
        if (click$) {
            const subscription = mapTo(id)(fromEvent(button.current, "click")).subscribe(click$); // subject subscribing to click stream of this square
            return function cleanup() { subscription.unsubscribe() };
        }
    }, [button, click$, id]);

    return (
        <button ref={button} className="square">
            {isActive && "X"}
        </button>
    );
}