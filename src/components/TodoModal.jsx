import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const TodosModal=({ abierto, cerrar, children })=>{
    useEffect(()=>{
        const manejarEsc=(evento)=>{
            if(evento.key === 'Escape'){
                cerrar();
            }
        };

        if(abierto){
            window.addEventListener('keydown', manejarEsc);
        }

        return ()=> window.removeEventListener('keydown', manejarEsc);
    }, [ abierto, cerrar ]);

    if(!abierto) return null;

    return createPortal(
        <div className="overlay" onClick={cerrar} style={overlayStyles}>
            <div className="contenido" onClick={e=>e.stopPropagation()} style={modalStyles}>
                {children}
                <button onClick={cerrar}>Cerrar (Esc)</button>
            </div>
        </div>,
        document.body
    );
};

//Estilos minimos para visualizar bien
const overlayStyles={
    position: 'fixed', 
    top:0, 
    left: 0, 
    width: '100%', 
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItem: 'center'
};

const modalStyles ={ 
    background: 'gray', 
    padding: '2rem',
    borderRadius: '10px'
};

export default TodosModal;
