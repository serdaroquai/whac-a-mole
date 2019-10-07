# whac-a-mole

[See it live here](https://serdaroquai.github.io/whac-a-mole/)

Simple whack-a-mole game implemented with [RxJs](https://rxjs-dev.firebaseapp.com/) and [React Hooks](https://en.reactjs.org/docs/hooks-overview.html). Every change in game state is derived from subscribing to an Rxjs observable and using the operators (pure functions) to 'derive' higher order events. For instance:

```javascript
// square publish 'points earned' to the score$ observable every time user whacks-a-mole
score$           |0---20----33---16--

//cumulative score is calculated for each update score$ receives.
const cumulativeScore$ = scan((acc,val) => acc + val, 0)(score$);
cumulativeScore$ |0---20----53---69--

//best score is calculated for each update cumulative score receives.
const bestScore$ = scan((acc,val) => Math.max(acc, val))(cumulativeScore$);
bestScore$       |0---20----53---69--
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
