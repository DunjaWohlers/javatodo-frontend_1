import {Todo} from "../types/TodoType";
import {useState} from "react";
import {addTodo} from "../service/api-service";
import {TodoStatus} from "../types/TodoStatus";
import { Kategorie } from "../types/Kategorie";

type TodoProps = {
    todo: Todo;
    setEdit: (edit: Todo | undefined) => void;
}

export default function AddFormular(prop: TodoProps) {
    const [description, setDescription] = useState<string>(prop.todo.description);
    const [kategorie, setKategorie] = useState<Kategorie>( prop.todo.kategorie)

    return (
        <form id="addForm" >
            <h2> Notiz hinzufügen</h2>
            <p>
                <input autoFocus={true}
                type="text" name="description" id="description" defaultValue={description}
            onChange={e=>setDescription(e.target.value)}/>
            </p>
            
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
                    await addTodo({id:"", description:description, status:TodoStatus.OPEN,kategorie:kategorie});
                    prop.setEdit(undefined);
                   }
                }
                > &#10004;</button>
        </form>
    )
}