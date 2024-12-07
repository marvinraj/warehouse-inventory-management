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
import Outbound from './pages/Outbound'
import AddOutbound from './pages/AddOutbound'
import EditOutbound from './pages/EditOutbound'
import LoginPage from './pages/LoginPage'

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
      <Route path='/outbound' element={<Outbound/>}/>
      <Route path='/addoutbound' element={<AddOutbound/>} />
      <Route path='/editoutbound/:id' element={<EditOutbound/>} />
      <Route path='/login' element={<LoginPage/>} />
    </Routes>
      {/* <div className='main-page'>
        <Sidebar/>
        <Dashboard/>
      </div> */}
    </>
  )
}

export default App
