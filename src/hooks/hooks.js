import { RxJsContext } from '../App';
import { useContext, useState, useEffect } from 'react';

export function useObservable(select, transform = obs$=>obs$, initialValue) {
    const [context, dispatch] = useContext(RxJsContext);
    const [value, setValue] = useState(initialValue);
    const obs$ = select(context);

    useEffect(()=> {
        if (obs$) {
            const sub = transform(obs$).subscribe(val => setValue(val));
            return () => sub.unsubscribe();
        }
    },[obs$]);

    return value;
}