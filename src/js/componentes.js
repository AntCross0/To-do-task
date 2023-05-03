import { Todo } from '../classes';
import { TodoList, todoList } from '../';


const list = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const aTagFilters = document.querySelectorAll('.filtro');



export const crearTareaHTML = ( todo ) => {

    const TareaElement = `<li class="${ (todo.completado) ? 'completed': '' }" data-id="${ todo.id }">
    <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked': '' }>
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li>`;

    
    const div = document.createElement('div');
    div.innerHTML = TareaElement;   

    list.append( div.firstElementChild);

    return div.firstElementChild;

}



//EVENTS


txtInput.addEventListener('keyup', ( event ) => {

    if(event.keyCode ===  13 && txtInput.value.length > 0 ){
    const nuevoTodo = new Todo(txtInput.value);

    todoList.nuevoTodo( nuevoTodo );
    crearTareaHTML(nuevoTodo);

    txtInput.value = '';
    }



})


list.addEventListener('click', (event) => {

const nombreElemento = event.target.localName; //input, label, button
const todoElemento = event.target.parentElement.parentElement; //devuelve el padre del elemento
const todoId = todoElemento.getAttribute('data-id'); //devuelve todo el valor que este en ese atributo

if (nombreElemento.includes('input')){
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
}
else if (nombreElemento.includes('button')){
    todoList.eliminarTodo( todoId );
    list.removeChild( todoElemento);

}




})

btnBorrarCompletados.addEventListener( 'click', (event) => {

    todoList.eliminarCompletados();

    for(let i = list.children.length - 1; i >= 0; i--){
        const elemento = list.children[i];
        if(elemento.classList.contains('completed')){
            list.removeChild(elemento);
        }
    }

})


ulFilters.addEventListener( 'click', (event) => {
    const filtro = event.target.text;
    aTagFilters.forEach( elem => elem.classList.remove('selected'));

    event.target.classList.add('selected');

    if(!filtro) {return;}

    for(const elemento of list.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if ( completado ) {
                    elemento.classList.add('hidden');
                }break;

            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
})