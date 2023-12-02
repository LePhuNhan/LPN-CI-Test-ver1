import React ,{useContext,useEffect,useState}from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TabMui from './Components/TabMui'
import { TodoContext } from './Context/TodoProvider';
import TodoProvider from './Context/TodoProvider';
function App() {
  const { state, dispatch } = useContext(TodoContext);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    dispatch({ type: 'load', payload: storedTodos });
  }, []);
  return (
    <>
      <TodoProvider>
        <h1>#todo</h1>
        <TabMui>

        </TabMui>
      </TodoProvider>

    </>
  )
}

export default App
