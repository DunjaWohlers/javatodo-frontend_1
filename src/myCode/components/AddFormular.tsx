import {Todo} from "../types/TodoType";
import {useState} from "react";
import {addTodo} from "../service/api-service";
import {TodoStatus} from "../types/TodoStatus";

type TodoProps = {
    todo: Todo;
    setEdit: (edit: Todo | undefined) => void;
}

export default function AddFormular(prop: TodoProps) {
    const [description, setDescription] = useState<string>(prop.todo.description);
    return (
        <form id="addForm" >
            <h2> Notiz hinzufügen</h2>
            <p><input autoFocus={true}
                type="text" name="description" id="description" defaultValue={description}
            onChange={e=>setDescription(e.target.value)}/></p>
                <button onClick={() => prop.setEdit(undefined)}>&#10008;</button>
                <button type="submit"
                onClick={
                   async (e) => {
                    await addTodo({id:"", description:description, status:TodoStatus.OPEN});
                    prop.setEdit(undefined);
                   }
                }
                > &#10004;</button>
        </form>
    )
}