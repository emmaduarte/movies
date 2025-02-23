import React, { useState, useEffect } from "react";
import Listado from "./Componentes/Listado/Listado";
import Detalles from "./Componentes/Detalles/Detalles";
import Nav from "./Componentes/Nav/Nav";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Busqueda from "./Componentes/Busqueda/Busqueda";
import Home from "./Componentes/Home/Home";
import NotPage from "./Componentes/NotPage/NotPage";

const App = () => {
  return (
      <BrowserRouter basename="/movies">
        
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="/Listado/:tipo/:categoria/:pag" element={<Listado />} />
            <Route path="/:tipo/Detalles/:title/:id" element={<Detalles />} />
            <Route path="/Busqueda/:query" element={<Busqueda />} />
          </Route>
          <Route path="/NotPage" element={<NotPage />} />
          <Route path="*" element={<Navigate to='/NotPage' replace />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
