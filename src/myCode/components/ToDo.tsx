import {TodoStatus} from "../types/TodoStatus";
import {Todo} from "../types/TodoType";
import {deleteTodo, putTodo} from "../service/api-service";

type TodoProp = {
    todo: Todo
    setEdit:(edit:Todo|undefined) =>void;
}

export default function ToDo(prop: TodoProp) {
     const arise= () => {
         if (prop.todo.status === TodoStatus.DONE) {
             deleteTodo(prop.todo.id).then(data => prop.setEdit(undefined)).catch((e) => console.log(e))
         } else {
             let status: TodoStatus;
             if (prop.todo.status === TodoStatus.OPEN) {
                 status = TodoStatus.IN_PROGRESS;
             } else if (prop.todo.status === TodoStatus.IN_PROGRESS) {
                 status = TodoStatus.DONE;
             }else{status = TodoStatus.OPEN;}
             putTodo( {id: prop.todo.id, description: prop.todo.description, status: status, kategorie: prop.todo.kategorie})
                 .then(data => prop.setEdit(undefined)).catch((e) => console.log(e))
         }
     }
        const decrease= () => {
            if (prop.todo.status === TodoStatus.OPEN) {
            } else {
                let status: TodoStatus;
                if (prop.todo.status === TodoStatus.IN_PROGRESS) {
                    status = TodoStatus.OPEN;
                } else if (prop.todo.status === TodoStatus.DONE) {
                    status = TodoStatus.IN_PROGRESS;
                }else{status = TodoStatus.DONE;}
                putTodo( {id: prop.todo.id, description: prop.todo.description, status: status, kategorie: prop.todo.kategorie})
                    .then(data => prop.setEdit(undefined)).catch((e) => console.log(e))
            }
        }


    return (
        <>
        <div className={'todoCard '+prop.todo.kategorie}>
            <button onClick={decrease}> &lt; </button>
           <div> <p>{prop.todo.description}</p>
               <p>{prop.todo.kategorie? prop.todo.kategorie:"nix kategorie"}</p>
           </div>
            <div>
            <button className="editButton" onClick={()=>prop.setEdit(prop.todo)}>&#9998;</button>

            <button onClick={arise}> &gt; </button>
            </div>
        </div>
        </>
    )
}