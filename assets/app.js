(function(){
    const notes = document.querySelector('#notes');

    // Por buena practica los event listener van en una función, asi no quedan globales
    
    const eventListener = () => {
        // obtener nota
        const form = document.querySelector('#formulario');
        form.addEventListener('submit', addNote);
        
        const a = document.querySelector('#notes');
        a.addEventListener('click', borrarNota );

        document.addEventListener('DOMContentLoaded', localStorageLista);
    };
    
    const addNote = (e) => {
        e.preventDefault();
        const nota = document.querySelector('#note').value;
    
        // Elemento de borrar
        const borrar = document.createElement('a');
        borrar.className = 'borrar-nota';
        borrar.innerText = 'X';
    
        // Elemento de la lista
        const li = document.createElement('li');
        li.innerText = nota.trim();
        li.appendChild(borrar);
        notes.appendChild(li);
    
        //agregar al local storage
        getls(nota.trim());
        
    };
    
    const borrarNota = (e) => {
        e.preventDefault();

        if (e.target.className == 'borrar-nota') {
            e.target.parentElement.remove();
            const notaR = e.target.parentElement.innerText;
            borrarNotaLocalStorage(notaR);
        }
    }

    const localStorageLista = () => {
        let notas = getLocalStorage();

        notas.forEach(function (nota) {
            const borrar = document.createElement('a');
            borrar.className = 'borrar-nota';
            borrar.innerText = 'X';
        
            // Elemento de la lista
            const li = document.createElement('li');
            li.innerText = nota;
            li.appendChild(borrar);
            notes.appendChild(li);
        });
    }
    
    const addLocalStorage = () => {
        let notas = getLocalStorage();
        return addLocal = (nota) => {
            notas =  [...notas, nota]
            localStorage.setItem('notas', JSON.stringify(notas));
        }
    }

    const borrarNotaLocalStorage = (nota) => {
        let notas, notaRemove;
        notaRemove = nota.substring(0, nota.length -1);
        notas = getLocalStorage();
        notas.forEach((v, i)=> {
            if(v === notaRemove) {
                notas.splice(i,1);
            }    
        });
        localStorage.setItem('notas', JSON.stringify(notas))
    }

    const getLocalStorage = () => {
       return localStorage.getItem('notas') ? JSON.parse(localStorage.getItem('notas')): [];
    }
    
    let getls = addLocalStorage();
    eventListener();
})();
