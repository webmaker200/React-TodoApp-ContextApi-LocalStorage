import { useContext } from "react";
import { createContext } from "react";



export const TodoContext = createContext({
    todos:[
        {
            todo:'Todo Message',
            id: 1,
            checked: false
        }       
    ],
    addTodo: ()=>{},
    updateTodo:()=>{},
    deleteTodo:()=>{},
    toggleChecked:()=>{}
});

export const useTodo = ()=>{
    return useContext(TodoContext)
}

export const TodoProvider =  TodoContext.Provider;



