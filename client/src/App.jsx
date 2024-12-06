import './App.css'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Inventory from './pages/Inventory'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Inbound from './pages/Inbound'
import AddInbound from './pages/AddInbound'
import EditInbound from './pages/EditInbound'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path='/inventory' element={<Inventory/>} />
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/editproduct/:id' element={<EditProduct/>}/>
      <Route path='/inbound' element={<Inbound/>}/>
      <Route path='/addpurchase' element={<AddInbound/>} />
      <Route path='/editpurchase/:id' element={<EditInbound/>} />
    </Routes>
      {/* <div className='main-page'>
        <Sidebar/>
        <Dashboard/>
      </div> */}
    </>
  )
}

export default App
