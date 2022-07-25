import {Todo} from "../types/TodoType";
import {useState} from "react";
import {putTodo} from "../service/api-service";
import { TodoStatus} from "../types/TodoStatus";
import { Kategorie } from "../types/Kategorie";

type TodoProps = {
    todo: Todo;
    setEdit: (edit: Todo | undefined) => void;
}

export default function EditFormular(prop: TodoProps) {
    const [description, setDescription] = useState<string>(prop.todo.description)
    const [status, setStatus] = useState<TodoStatus>( prop.todo.status)
    const [kategorie, setKategorie] = useState<Kategorie>( prop.todo.kategorie)

    return (
        <form id="editForm">
            <h2>Notiz ändern</h2>
            <p><input autoFocus={true} type="text" name="description" id="description" defaultValue={description}
            onChange={e=>setDescription(e.target.value)}/></p>
            <p>
                <select  defaultValue={status} onChange={e=>setStatus(e.target.value as TodoStatus
                 )}>
                    <option  value={TodoStatus.OPEN}>Open</option>
                    <option value={TodoStatus.IN_PROGRESS}>In Progress</option>
                    <option value={TodoStatus.DONE}>Done</option>
                </select>
                </p>
            <p>

                <select  defaultValue={kategorie} onChange={e=>setKategorie(e.target.value as Kategorie
                )}>
                    <option  value="EINKAUF">Einkauf</option>
                    <option value="HAUSHALT">Haushalt</option>
                    <option value="BERUF">Beruf</option>
                    <option value="BUERO">Büro</option>
                    <option value="GARTEN">Garten</option>
                </select>

                <button onClick={() => prop.setEdit(undefined)}>&#10008;</button>
                <button type="submit"
                onClick={
                   async (e) => {
                    await putTodo({id:prop.todo.id, description:description, status:status, kategorie:kategorie});
                    prop.setEdit(undefined);
                   }
                }
                > &#10004;</button>

            </p>
        </form>
    )
}