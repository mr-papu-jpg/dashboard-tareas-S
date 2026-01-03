import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { TodosProvider } from './context/TodoContext'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodosProvider>
        <App/>
    </TodosProvider>
  </StrictMode>,
)
