//We need to import TodoList
import React,{useState, useRef,useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
const LOCAL_STORAGE_KEY = 'todoApp.allTodos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef=useRef();
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  
  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  return  (
    //warp multiple returns in a fragment <></>
    //This is a component. It is a function that returns JSX
    //all of our components are going to have props that we can pass in
    //just like we pass attributes into HTML elements
    <><TodoList todos={todos} toggleTodo={toggleTodo}/> 
      <input ref ={todoNameRef}type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </>
  )//() can let you have multiple lines of code

}

export default App;
