
import { RxJsContext } from '../App';
import React, { useContext, useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';

export default function SomeComponent(props) {

    const [context, dispatch] = useContext(RxJsContext);
    const bt1 = useRef(null);

    useEffect(() => {

        console.log("someeffect");
        dispatch(
            {
                key: "click$",
                value: (fromEvent(bt1.current, 'click'))
            });

    }, [bt1, dispatch]);

    return (
        <button ref={bt1}>Increment</button>
    )
}