import React, { createContext, useReducer, useEffect } from 'react'

export const TodoContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "load":
            return {
                ...state,
                todos: action.payload,
            }
        case "add":
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case "edit":
            return {
                ...state,
                editIndex: null,
                todos: state.todos.map((todo, index) => {
                    return index === action.payload.index ? {
                        title: action.payload.title,
                        checked: action.payload.checked
                    } : todo
                })
            }
        case "delete":
            return {
                ...state,
                todos: state.todos.filter((todo, index) => index !== action.payload.index)
            }
        case "updateEditIndex":
            return {
                ...state,
                editIndex: null,
                todos: state.todos.map((todo, index) => {
                    return index === action.payload.index ? {
                        title: action.payload.title,
                        checked: action.payload.checked
                    } : todo
                })

            }
        case "deleteAll":
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.checked)
            };
        default:
            return state;
    }
}

const TodoProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, { todos: [], editIndex: null })
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        console.log(storedTodos);
        dispatch({ type: 'load', payload: storedTodos });
      }, []);
      useEffect(() => {
        const saveToLocalStorage = () => {
          localStorage.setItem('todos', JSON.stringify(state.todos));
        };
      
        const timeoutId = setTimeout(saveToLocalStorage, 100);
      
        return () => {
          clearTimeout(timeoutId);
        };
      }, [state.todos]);
    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoProvider