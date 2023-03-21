import React from 'react'
import Todo from './Todo'
//create a function component
export default function TodoList({todos, toggleTodo}) {
  return (
    //we want to map our current todos to a list of JSX elements
  
    todos.map(todo => {
      return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}  />})
   
  )
}
