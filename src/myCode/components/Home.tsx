import {getAllTodos} from "../service/api-service";
import {useEffect, useState} from "react";
import {TodoStatus} from "../types/TodoStatus";
import {Todo} from "../types/TodoType";
import EditFormular from "./EditFormular";
import ToDo from "./ToDo";
import AddFormular from "./AddFormular";

export default function Home() {

    const ueberschrift = " Todo - Liste ";

    const [edit, setEdit] = useState<Todo>();
    const [showClass, setShow] = useState<TodoStatus | null>(null)


    const [toDos, setTodos] = useState<Todo[]>([])
    let nullTodo = {id: "000", description: "Was möchtest du tun?", status: TodoStatus.OPEN}
    let open = toDos.filter(e => e.status === TodoStatus.OPEN);
    let inProgress = toDos.filter(e => e.status === TodoStatus.IN_PROGRESS);
    let done = toDos.filter(e => e.status === TodoStatus.DONE);
    useEffect(() => {
        if (edit === undefined) {
            getAllTodos().then(data => {
                setTodos(data);
                console.log(data);
            });
        }
    }, [edit, open, inProgress, done])


    if (edit && edit.id.length > 10) {
        return <EditFormular todo={edit} setEdit={setEdit}/>
    } else if (edit) {
        return (<AddFormular todo={{id: "1", description: "", status: TodoStatus.OPEN}}
                             setEdit={setEdit}
                             key="123"
        />)
    }


    return (
        <div>
            <h1> &#10059; {ueberschrift} &#10059; <button onClick={() =>
                setEdit(nullTodo)
            }>  &#x1F4C3;  +
            </button></h1>

            <div className={"unmarkedContainer"}>
                <div className={( showClass !== null)? "notmarked":"marked"}>
                        <button onClick={() => setShow(null)}>All</button>
                    </div>
                <div className={( showClass !== TodoStatus.OPEN)? "notmarked":"marked"}>
                        <button onClick={() => setShow(TodoStatus.OPEN)}>Open</button>
                    </div>
                <div className= {(showClass !== TodoStatus.IN_PROGRESS)?"notmarked":"marked"}>
                        <button onClick={() => setShow(TodoStatus.IN_PROGRESS)}>In Progress</button>
                    </div>

                <div className= {( showClass !== TodoStatus.DONE) ?"notmarked":"marked"}>
                        <button onClick={() => setShow(TodoStatus.DONE)}>Done:</button>
                    </div>
            </div>
            <div className="todoContainer">

                <div className={TodoStatus.OPEN}>






                    {(showClass === null ||showClass === TodoStatus.OPEN) &&
                        <div className="marked">
                            <button onClick={() => setShow(TodoStatus.OPEN)}>Open</button>
                        </div>}

                    {(showClass === null || showClass === TodoStatus.OPEN) && open.map((e: Todo) => {
                        return <ToDo todo={e} setEdit={setEdit} key={e.id}/>
                    })}
                </div>
                <div className={TodoStatus.IN_PROGRESS}>


                        {(showClass === null ||showClass === TodoStatus.IN_PROGRESS) &&
                            <div className="marked">
                                <button onClick={() => setShow(TodoStatus.IN_PROGRESS)}>In Progress</button>
                            </div>}


                    {(showClass === null || showClass === TodoStatus.IN_PROGRESS) &&
                        inProgress.map((e: Todo) => {
                            return <ToDo todo={e} setEdit={setEdit} key={e.id}/>
                        })}
                </div>
                <div className={TodoStatus.DONE}>


                    {(showClass === null ||showClass === TodoStatus.DONE) &&
                        <div className="marked">
                            <button onClick={() => setShow(TodoStatus.DONE)}>Done:</button>
                        </div>}


                    {(showClass === null || showClass === TodoStatus.DONE) &&
                        done.filter(e => e.status === TodoStatus.DONE).map((e: Todo) => {
                            return <ToDo todo={e} setEdit={setEdit} key={e.id}/>
                        })}
                </div>

            </div>
        </div>
    )

}