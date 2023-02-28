import ReactDOM from 'react-dom/client'
import { FiltersProvider } from './context/filters'
import App from './App'
import ReloadPrompt from './components/ReloadPrompt'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FiltersProvider>
    <ReloadPrompt />
    <App />
  </FiltersProvider>
)
