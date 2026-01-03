import React, { useEffect, useState, useRef } from "react";
import api from './api/axiosConfig';
import { useTodos } from './context/TodoContext';
import TodosModal from './components/TodoModal';

function App(){
    const { state, dispatch }= useTodos();
    const [ modalAbierto, setModalAbierto ]= useState(null);
    const cerrar=()=>setModalAbierto(null);
    const inputRefTitle= useRef(null);
    const inputRefTarea= useRef(null);

    const AgregarTarea= async ()=>{
        try{
            const res = await api.post('/todos', {
                title: inputRefTitle.current.value, // Acceso al valor real
                tarea: inputRefTarea.current.value,
                userId: 1
            });
            // 3. Actualizar el estado global con la respuesta
            dispatch({ type: 'ADD_TODO', payload: res.data });
            cerrar();
        }catch(err){
            console.error("Error al agregar", err);
        }
    }

    useEffect(()=>{
        const controler= new AbortController();
        const fetchTodos= async ()=>{
            dispatch({ type: 'START_LOADING' });

            try{
                const res = await api.get(`/todos?_limit=5`, { signal: controler.signal });
                dispatch({ type: 'SET_TODOS', payload: res.data });
            } catch(err){
                if(api.isCacel(err)) console.log("peticion cancelada");
                else dispatch({ type: 'SET_ERROR', payload: err.message });
            }
        };

        fetchTodos();
        return ()=> controler.abort();
    },[ dispatch ]);



    return (
        <>
                <h1>Mis Tareas</h1>
                <button onClick={()=> setModalAbierto('login')}>
                     Agregar Tarea.
                </button>
                <TodosModal abierto={modalAbierto === 'login'} cerrar={cerrar}>
                    <h2>Agregue una tarea</h2>
                    <p>Titulo</p>
                    <input ref={inputRefTitle} type="text" placeholder="titulo de la tarea a agregar"/>
                    <input ref={inputRefTarea}type="text" placeholder="tarea a agregar"/>
                    <button onClick={AgregarTarea()}>
                      Agregar
                    </button>
                </TodosModal>
                {state.loading && <p>Cargando...</p>}
                <ul>
                    {state.items.map(todo => <li key={todo.id}>
                        { todo.title }
                    </li>)}
                </ul>  
        </>
    );
}

export default App;
