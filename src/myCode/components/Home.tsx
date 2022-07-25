import {getAllTodos} from "../service/api-service";
import {useEffect, useState} from "react";
import {TodoStatus} from "../types/TodoStatus";
import {Todo} from "../types/TodoType";
import EditFormular from "./EditFormular";
import ToDo from "./ToDo";
import AddFormular from "./AddFormular";
import {Kategorie} from "../types/Kategorie";

export default function Home() {

    const ueberschrift = " Todo - Liste ";

    const [edit, setEdit] = useState<Todo>();
    const [showClass, setShow] = useState<TodoStatus | null>(null)
    const [search, setSearch] = useState<string>("");

    const [toDos, setTodos] = useState<Todo[]>([])
    const [kategorie, setKategorie] = useState<string>("ALLE")

    let nullTodo = {id: "000", description: "Was möchtest du tun?", status: TodoStatus.OPEN, kategorie: "EINKAUF" as Kategorie};
    let open = toDos.filter(e => e.status === TodoStatus.OPEN).sort((a,b)=>
    {
        if (a.description<b.description) {return -1;}
        if (a.description>b.description) {return 1;}
        return 0;
    });
    let inProgress = toDos.filter(e => e.status === TodoStatus.IN_PROGRESS).sort((a,b)=>
    {
        if (a.description<b.description) {return -1;}
        if (a.description>b.description) {return 1;}
        return 0;
    });
    let done : Todo[]= toDos.filter(e => e.status === TodoStatus.DONE).sort((a,b)=>
    {
        if (a.description<b.description) {return -1;}
        if (a.description>b.description) {return 1;}
        return 0;
    });


    /*
     const sortieren:(a:Todo,b:Todo)=>number = (a:Todo,b:Todo)=>   {
        if (a.description<b.description) {return -1;}
        if (a.description>b.description) {return 1;}
        return 0;
    }
    */

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
        return (<AddFormular todo={{id: "1", description: "", status: TodoStatus.OPEN, kategorie: "EINKAUF"}}
                             setEdit={setEdit}
                             key="123"
        />)
    }


    return (
        <div>
            <h1>
                <select  defaultValue="Alle" onChange={e=>setKategorie(e.target.value as Kategorie
            )}>
                <option  value="ALLE">Alle</option>
                <option  value="EINKAUF">Einkauf</option>
                <option value="HAUSHALT">Haushalt</option>
                <option value="BERUF">Beruf</option>
                <option value="BUERO">Büro</option>
                <option value="GARTEN">Garten</option>
            </select>

                &#10059; {ueberschrift} &#10059;
                <button onClick={() =>
                    setEdit(nullTodo)
                }>  &#x1F4C3;  +
                </button>
                <input type="text" defaultValue="Search" id="searchInput"  onFocus={e=>e.target.select()}
                       onChange={(e) => setSearch(e.target.value)}/>
            </h1>

            <div className={"unmarkedContainer"}>
                <div className={showClass !== null ? "notmarked" : "marked"}>
                    <button onClick={() => setShow(null)}>All</button>
                </div>
                <div className={showClass !== TodoStatus.OPEN ? "notmarked" : "marked"}>
                    <button onClick={() => setShow(TodoStatus.OPEN)}>Open</button>
                </div>
                <div className={showClass !== TodoStatus.IN_PROGRESS ? "notmarked" : "marked"}>
                    <button onClick={() => setShow(TodoStatus.IN_PROGRESS)}>In Progress</button>
                </div>

                <div className={showClass !== TodoStatus.DONE ? "notmarked" : "marked"}>
                    <button onClick={() => setShow(TodoStatus.DONE)}>Done:</button>
                </div>
            </div>
            <div className="todoContainer">
                <div className={TodoStatus.OPEN}>
                    {(showClass === null || showClass === TodoStatus.OPEN) &&
                        <div className="marked">
                            <button onClick={() => setShow(TodoStatus.OPEN)}>Open</button>
                        </div>}

                    {(showClass === null || showClass === TodoStatus.OPEN) &&
                        open.map((e: Todo) => {
                            return e.description.includes(search)&&(kategorie==="ALLE"||kategorie===e.kategorie)&& <ToDo todo={e} setEdit={setEdit} key={e.id}/>
                        })}
                </div>
                <div className={TodoStatus.IN_PROGRESS}>

                    {(showClass === null || showClass === TodoStatus.IN_PROGRESS) &&
                        <div className="marked">
                            <button onClick={() => setShow(TodoStatus.IN_PROGRESS)}>In Progress</button>
                        </div>}

                    {(showClass === null || showClass === TodoStatus.IN_PROGRESS) &&
                        inProgress.map((e: Todo) => {
                            return e.description.includes(search)&&(kategorie==="ALLE"||kategorie===e.kategorie)&&<ToDo todo={e} setEdit={setEdit} key={e.id}/>
                        })}
                </div>
                <div className={TodoStatus.DONE}>
                    {(showClass === null || showClass === TodoStatus.DONE) &&
                        <div className="marked">
                            <button onClick={() => setShow(TodoStatus.DONE)}>Done:</button>
                        </div>}
                    {(showClass === null || showClass === TodoStatus.DONE) &&
                        done.filter(e => e.status === TodoStatus.DONE).map((e: Todo) => {
                            return e.description.includes(search)&&(kategorie==="ALLE"||kategorie===e.kategorie)&&<ToDo todo={e} setEdit={setEdit} key={e.id}/>
                        })}
                </div>
            </div>
        </div>

    )

}