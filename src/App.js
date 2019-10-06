import React, {createContext, useReducer} from 'react';
import './App.css';
import Board from './components/Board';
import Score from "./components/Score";

export const RxJsContext = createContext();

function reducer(state, action) {
  console.log("reducer",state, action);
  
  return {
    ...state,
    [action.key]: action.value
  }

}

function App() {
  const [context, dispatch] = useReducer(reducer, {});
  
  return (
    <RxJsContext.Provider value={[context, dispatch]}>
      <Score></Score>
      <Board></Board>
    </RxJsContext.Provider>
  );
}


export default App;
