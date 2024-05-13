import { useState } from 'react'
import './App.css'
import { HeaderFerreplus } from './components/HeaderFerreplus'
import { Route, Routes } from 'react-router-dom'
import { FormularioLogin } from './components/FormularioLogin'
import { FormularioRegistro } from './components/FormularioRegistro'
import { Productos } from './components/Productos'
import { CambioContra } from './components/CambioContra'
import { Sucursales } from './components/Sucursales'
import { Intercambios } from './components/Intercambios'
import { Admin } from './components/Admin'
import { PerfilUsuario } from './components/PerfilUsuario'
import { AgregarSucursal } from './components/AgregarSucursal'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HeaderFerreplus></HeaderFerreplus>
      <Routes>
        <Route path='/' element={<Productos />}></Route>
        <Route path='/inicioSesion' element={<FormularioLogin />}></Route>
        <Route path='/registrarse' element={<FormularioRegistro />}></Route>
        <Route path='/productos' element={<Productos />} />
        <Route path='/cambiocontra' element={<CambioContra />}></Route>
        <Route path='/sucursales' element={<Sucursales />}> </Route>
        <Route path='/intercambios' element={<Intercambios />}> </Route>
        <Route path='/admin' element={<Admin />}> </Route>
        <Route path='/perfilUsuario' element={<PerfilUsuario />}> </Route>
        <Route path='/admin/agregarSucursal' element={<AgregarSucursal />}></Route>
      </Routes>
    </>
  )
}

export default App;
