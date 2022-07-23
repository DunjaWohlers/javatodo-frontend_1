import axios from "axios";
import {Todo} from "../types/TodoType";

export const getAllTodos = () =>
    axios.get('/api/todo').then(response => response.data)

export const addTodo = (todo:Todo) =>
    axios.post('/api/todo',  todo).then(response => response.data)

export const getTodoPerId = (id:string) =>
    axios.get('/api/todo/'+id).then(response => response.data)

export const putTodo = (todo:Todo) =>
    axios.put('/api/todo/'+todo.id , todo).then(response => response.data)

//update
export const deleteTodo = (id:string)=>
    axios.delete('/api/todo/'+id).then(response => response.data)