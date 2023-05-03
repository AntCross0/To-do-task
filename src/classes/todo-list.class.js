import { todoList, } from "..";
import { Todo } from "./index";

export class TodoList {

    constructor () {
        this.LoadTodosLocalStorage();


    }

    nuevoTodo ( todo ) {
        this.todos.push( todo );
        this.saveTodoLocalStorage();
    }

    eliminarTodo ( id ) {

        this.todos = this.todos.filter( todo => todo.id != id);
        this.saveTodoLocalStorage();


    }

    marcarCompletado ( id ) {

        for (const todo of this.todos){
            if ( todo.id == id){
                todo.completado = !todo.completado;
                this.saveTodoLocalStorage();
                break;
            }
        }

    }

    eliminarCompletados () {

        this.todos = this.todos.filter( todo => !todo.completado );
        this.saveTodoLocalStorage();

        
    }

    saveTodoLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    LoadTodosLocalStorage(){
        this.todos = (localStorage.getItem('todo')? this.todos = JSON.parse(localStorage.getItem('todo')): this.todoList = []  )


        this.todos = this.todos.map( Todo.fromJson );
    }

}