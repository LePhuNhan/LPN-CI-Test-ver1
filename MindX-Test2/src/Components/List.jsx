import React ,{useContext,useEffect,useState}from 'react'
import { TodoContext } from '../Context/TodoProvider';
import Checkbox from '@mui/material/Checkbox';

const List = () => {
    const {state, dispatch}=useContext(TodoContext);
    const [title, setTitle] = useState("");
    const [checked, setChecked] = useState("");
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        console.log(storedTodos);
        dispatch({ type: 'load', payload: storedTodos });
      }, []);
    const updateHandler=(index)=>{
        
        setChecked(state.todos[index].checked=!state.todos[index].checked)
        setTitle(state.todos[index].title)
        console.log(state.todos[index].checked);
        
        dispatch({
            type: "updateEditIndex",
            payload:{
                index: state.editIndex,
                title,
                checked
            },
            
        })
    }
    const deleteHandler=(index)=>{
        dispatch({
            type: "delete",
            payload:{
                index
            }
        })
    }
    useEffect(() => {
        // Load data from localStorage when the component mounts
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        dispatch({
          type: "load",
          payload: storedTodos,
        });
      }, [dispatch]);
    useEffect(()=>{
        if(state.editIndex!==null){
            setTitle[state.todos[state.editIndex].title];
            setChecked[state.todos[state.editIndex].checked];
        }
        
    },[state.editIndex])
    
  return (
    <div style={{ display:"flex",flexDirection:"column",textAlign:"left",margin:"0 0 0 73px"}}>
        {
            state.todos.map((todo,index)=>{
                return <div key={index} style={{display:"inline-flex", textAlign:"left", padding:"0 0"}}>
                    <Checkbox defaultChecked={todo.checked} onClick={()=>updateHandler(index)}/>
                    <p style={{ textDecoration: todo.checked ? "line-through" : "none"}}>{todo.title}</p>
                </div>
            })
        }
    </div>
  )
}

export default List