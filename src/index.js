import { crearTareaHTML, saludar } from './js/componentes';
import './styles.css';
import { Todo, TodoList} from './classes';


export const todoList = new TodoList();
    
todoList.todos.forEach(todo => {
    crearTareaHTML(todo);
});

// todoList.todos.foreach(todo => crearTareaHTML(todo));