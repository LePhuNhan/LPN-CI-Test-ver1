import React, { useContext,useEffect,useState } from 'react'
import { TodoContext } from '../Context/TodoProvider';
import Button from '@mui/material/Button';
import "../assets/TabMui.css"

const Form = () => {
    const [title, setTitle] = useState("");
    const {dispatch,state}=useContext(TodoContext);
    const [checked, setChecked] = useState(false);
    // console.log("context => ",dispatch);
    const onSubmitHandler = () => {
        if(state.editIndex!==null){
            dispatch({
                type:"edit",
                payload:{
                    title,
                    checked,
                    index: state.editIndex
                }
            })
        }
        else{
            dispatch({
                type:"add",
                payload:{
                    title,
                    checked
                }
            })
            
        }
        setTitle("");
        setChecked(false);
    }
    useEffect(()=>{
        if(state.editIndex!==null){
            setTitle[state.todos[state.editIndex].title];
            setChecked[state.todos[state.editIndex].checked];
        }
        
    },[state.editIndex])
    return (
        <div>
            <input
                type='text'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder='add details'
                style={{height:"30px", width:"300px",borderRadius:"5px", padding:"0 10px"}}
            />
            <Button variant="contained" onClick={onSubmitHandler}>Add</Button>
        </div>
    )
}

export default Form