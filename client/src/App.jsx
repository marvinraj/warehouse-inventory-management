import './App.css'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Inventory from './pages/Inventory'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path='/inventory' element={<Inventory/>} />
    </Routes>
      {/* <div className='main-page'>
        <Sidebar/>
        <Dashboard/>
      </div> */}
    </>
  )
}

export default App
