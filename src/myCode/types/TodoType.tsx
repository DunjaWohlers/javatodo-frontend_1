import { Kategorie } from "./Kategorie";
import {TodoStatus} from "./TodoStatus";

export  type Todo = {
    id:string,
    description:string,
    status: TodoStatus,
    kategorie: Kategorie
}

