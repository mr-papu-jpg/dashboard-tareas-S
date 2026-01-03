import React, { createContext, useReducer, useContext } from 'react';

const TodoContex = createContext();

const todoReducer= (state, action)=>{
    switch(action.type){
        case 'SET_TODOS': return {... state, items: action.payload, loading:false };
        case 'ADD_TODO': return { ... state, items:[ action.payload, ...state.items ] };
        case 'SET_ERROR': return { ...state, error: action.payload, loading:false };
        case 'START_LOADING': return { ...state, loading:true };
        default: return state;
    }
};

export const TodosProvider=({ children })=>{
    const [ state, dispatch ]=useReducer(todoReducer, { items: [], loading: false, error: null });

    return(
        <TodoContex.Provider value={{ state, dispatch }}>
            { children }
        </TodoContex.Provider>
    );
};


export const useTodos = () => {
  const context = useContext(TodoContex);
  
  // Si el contexto es undefined, significa que olvidaste el Provider
  if (!context) {
    throw new Error("useTodos debe estar dentro de un TodoProvider");
  }
  
  return context;
};

