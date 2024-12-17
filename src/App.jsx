import { useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import { useId } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { useEffect } from 'react'

function App() {
const [todos, setTodos] = useState([])
const todoId = useId()
// LOGIC FOR ADD TODO 
const addTodo =(todo)=>{
  setTodos((prev)=>[{id: Date.now(), ...todo}, ...prev])
}

// FUNCTION FOR UPDATE TODO 
const updateTodo = (id, todo) =>{
  setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? todo : prevTodo))
}

// FUNCTION FOR DELETE TODO 

const deleteTodo = (id)=>{
  setTodos((prev)=> prev.filter((prevTodo)=> prevTodo.id !== id ))
}
const clearTodos =()=>{
  //localStorage.removeItem('todos')
  setTodos([])

}
const toggleChecked = (id)=>{
  setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, checked: !prevTodo.checked} : prevTodo))
}

useEffect(()=>{
 const todos =  JSON.parse(localStorage.getItem("todos"))
 if(todos && todos.length >0){
  setTodos(todos)
 }
}, [])


useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])


  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleChecked}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                      <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'>
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
                <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-12' onClick={clearTodos}>Clear All Todos</button>
            </div>

            
    </TodoProvider>
  )
}

export default App
