import React, {useState, useEffect} from 'react'
import Listado from './Componentes/Listado/Listado'
import Detalles from './Componentes/Detalles/Detalles'
import Nav from './Componentes/Nav/Nav'
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Busqueda from './Componentes/Busqueda/Busqueda'

const App = () => {
  
  
  return (
    <>
      
    
     <div>
      
      <BrowserRouter basename="/movies">
        <Nav/>
          <Routes>
            
            <Route path='/' exact element={<Listado/>}/>
            <Route path='/movies/Detalles/:title/:id' exact element={<Detalles/>}/>
            <Route path='/movies/Busqueda/:query' exact element={<Busqueda/>}/>
            
          </Routes>
        
      </BrowserRouter>
      
      </div>
      
</>
      
  )
}

export default App
