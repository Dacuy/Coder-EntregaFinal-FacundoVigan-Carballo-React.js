import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ItemListContainer from './components/itemListContainer'
import ItemList from './components/ItemList'
function App() {
  return(
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<ItemListContainer/>}/>
          <Route path='/category/:id' element={<ItemListContainer/>}/>
          <Route path='/item/:id' element={<ItemList/>}/>
        </Routes>
      </Router>
     
    </>
  )
}
export default App