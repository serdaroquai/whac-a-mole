import React, {createContext, useReducer} from 'react';
import './App.css';
import SomeComponent from './components/SomeComponent';
import DumbComponent from './components/DumbComponent';

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
        <DumbComponent></DumbComponent>
        <SomeComponent></SomeComponent>
    </RxJsContext.Provider>
  );
}


export default App;
