import React, { useState, useEffect } from "react";
import Listado from "./Componentes/Listado/Listado";
import Detalles from "./Componentes/Detalles/Detalles";
import Nav from "./Componentes/Nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Busqueda from "./Componentes/Busqueda/Busqueda";

const App = () => {
  return (
      <BrowserRouter basename="/movies">
        
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Listado />} />
            <Route path="/Detalles/:title/:id" element={<Detalles />} />
            <Route path="/Busqueda/:query" element={<Busqueda />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
