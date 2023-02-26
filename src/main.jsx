import ReactDOM from 'react-dom/client'
import { lazy } from 'react'
import './index.css'
import { FiltersProvider } from './context/filters'

const App = lazy(() => import('./App'))
const ReloadPrompt = lazy(() => import('./components/ReloadPrompt'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <FiltersProvider>
    <ReloadPrompt />
    <App />
  </FiltersProvider>
)
