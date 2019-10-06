import React, { useState, useContext, useEffect } from "react";
import { RxJsContext } from "../App";
import { BehaviorSubject } from "rxjs";

export default function Score(props) {

    const [score, setScore] = useState(0);
    const [{ score$ }, dispatch] = useContext(RxJsContext);

    useEffect(() => {
        dispatch({
            key: "score$",
            value: new BehaviorSubject(0)
        });
    }, []);

    useEffect(() => {
        if (score$) {
            const subs = [];
            subs.push(score$.subscribe(x => setScore(total => total + x)));
            return () => subs.forEach(sub => sub.unsubscribe());
        }
    }, [score$]);

    return (
        <h3>Score: {score}</h3>
    )
}