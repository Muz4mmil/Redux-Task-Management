import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Tasks from './pages/Tasks'
import Home from './pages/Home'
import TaskPage from './pages/TaskPage'

function App() {

  return (
    <BrowserRouter>
      <div className="px-4 lg:px-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
