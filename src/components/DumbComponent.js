import React from 'react';
import { scan, mapTo, debounceTime } from 'rxjs/operators'
import { useObservable } from '../hooks/hooks'


export default function DumbComponent(props) {

    const count = useObservable(
        state => state.click$, 
        click$ => click$.pipe(
            debounceTime(250),
            mapTo(1),
            scan((acc,val) => acc + val)
            ),
        0
    );
    
    return <h1>{count}</h1>;

}