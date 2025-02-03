import React, { useEffect, useRef, useReducer, useState } from "react";

function reducer(todos, action){
    switch(action.type){
        case 'add-todo':
            return[...todos, newtodo(action.payload.task)]
            case 'toggle-todo':
                return todos.map(todo =>{
                    if(todo.id === action.payload.id){
                        return {...todo, complete: !todo.complete}
                    }
                    return todo
                })
            case 'delete-todo':
                return todos.filter(todo => todo.id !== action.payload.id)
            default:
                return todos
    }
}

function newtodo(task){
    return {id: Date.now(), task:task,complete: false}
}

function ToDoApp() {
    const[todos, dispatch] = useReducer(reducer,[])
    const [task, setTask] = useState('')

    const inputref = useRef();

    useEffect(()=>{
        inputref.current.focus()
    },[])

    function handlesub(e){
        e.preventDefault()
        if(inputref.current.value === ''){
            return inputref.current.focus();
        }else{
            return (()=>{
                dispatch({type:'add-todo', payload: {task: task}})
                setTask('')
            })();
        } 
    }

  return (
    <div className="main-container">
        <div className="Todo-container">
            <h1 className="todo-name">To Do List</h1>
            <div className="form-cont">
                <form  className="form-input">
                    <input className="input-field" type="text" ref={inputref} value={task} placeholder="Type Your Task Here..." onChange={e => setTask(e.target.value)}/>
                    <button className="add-btn" onClick={handlesub}>ADD</button>
                </form>
                {todos.map(todo =>{
                    return (
                        <div className="task-container" key={todo.id}>
                            <span className="task-content" style={{color: todo.complete ? '#AAA' : '#000',textDecoration: todo.complete ?'line-through':'none'}}>{todo.task}</span>
                            <div className="task-op-btn">
                                <button  className="done-btn" onClick={()=> dispatch({type:'toggle-todo', payload:{id: todo.id}})}>{todo.complete ? 'Undo':'Done'}</button>
                                <button className="delete-btn" onClick={()=> dispatch({type:'delete-todo', payload:{id: todo.id}})}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  );
}

export default ToDoApp;
