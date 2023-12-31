import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../Context/TodoProvider';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import "../assets/TabMui.css"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const ListCompleted = () => {
    const { state, dispatch } = useContext(TodoContext);
    const [title, setTitle] = useState("");
    const [checked, setChecked] = useState("");
    const updateHandler = (index) => {

        setChecked(state.todos[index].checked = !state.todos[index].checked)
        setTitle(state.todos[index].title)
        console.log(state.todos[index].checked);

        dispatch({
            type: "updateEditIndex",
            payload: {
                index: state.editIndex,
                title,
                checked
            },

        })
    }
    const deleteHandler = (index) => {
        dispatch({
            type: "delete",
            payload: {
                index
            }
        })
    }
    const deleteAllHandler = () => {
        dispatch({
            type: "deleteAll",
            payload: {
            }
        })
    }
    useEffect(() => {
        if (state.editIndex !== null) {
            setTitle[state.todos[state.editIndex].title];
            setChecked[state.todos[state.editIndex].checked];
        }

    }, [state.editIndex])

    return (
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left", margin: "0 0 0 63px" }}>
            {
                state.todos.map((todo, index) => {
                    if (todo.checked == true) {
                        return <div key={index} style={{ display: "inline-flex", textAlign: "left", padding: "0 0" }}>
                            <Checkbox defaultChecked={todo.checked} onClick={() => updateHandler(index)} />
                            <p style={{ textDecoration: todo.checked ? "line-through" : "none" }}>{todo.title}</p>
                            <DeleteOutlinedIcon style={{ paddingTop: "15px", position: "absolute", marginLeft: "400px" }} onClick={() => deleteHandler(index)} />

                        </div>
                    }
                    else {
                        return;
                    }

                })

            }
            <Button className="btnDeleteAll" variant="contained" onClick={() => deleteAllHandler()}>
            <DeleteOutlinedIcon />
                delete all
            </Button>
        </div>

    )
}

export default ListCompleted