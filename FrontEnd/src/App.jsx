import './App.css'
import { HeaderFerreplus } from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { FormularioLogin } from './components/FormularioLogin'
import { FormularioRegistro } from './components/FormularioRegistro'
import { Productos } from './components/Productos'
import { CambioContra } from './components/CambioContra'
import { CambioContraSinEmail } from './components/CambioContraSinEmail'
import { Sucursales } from './components/Sucursales'
import { Intercambios } from './components/Intercambios'
import { Admin } from './components/Admin'
import { PerfilUsuario } from './components/PerfilUsuario'
import { AgregarSucursal } from './components/AgregarSucursal'
import { GestionSucursales } from './components/GestionSucursales'
import { GestionEmpleados } from './components/GestionEmpleados'
import { SubirImagen } from './components/SubirImagen'
import { EditarPerfil } from './components/EditarPerfil'
import { EliminarSucursal } from './components/EliminarSucursal'
import { GestionIntercambios } from './components/GestionIntercambios'
import { AgregarIntercambio } from './components/AgregarIntercambio'
import { EliminarIntercambio } from './components/EliminarIntercambio'
import { ProductoIntercambio } from './components/ProductoIntercambio'

function App() {

  return (
    <>
      <HeaderFerreplus></HeaderFerreplus>
      <Routes>
        <Route path='/' element={<Productos />}></Route>
        <Route path='/inicioSesion' element={<FormularioLogin />}></Route>
        <Route path='/registrarse' element={<FormularioRegistro />}></Route>
        <Route path='/productos' element={<Productos />} />
        <Route path='/cambiocontra' element={<CambioContra />}></Route>
        <Route path='/cambiocontrasinemail' element={<CambioContraSinEmail />}></Route>
        <Route path='/sucursales' element={<Sucursales />}> </Route>
        <Route path='/intercambios' element={<Intercambios />}> </Route>
        <Route path='/perfilUsuario' element={<PerfilUsuario />}> </Route>
        <Route path='/admin' element={<Admin />}> </Route>
        <Route path='/admin/sucursales' element={<GestionSucursales />}> </Route>
        <Route path='/admin/agregarSucursal' element={<AgregarSucursal />}></Route>
        <Route path='/admin/empleados' element={<GestionEmpleados />}> </Route>
        <Route path='/SubirImagen' element={<SubirImagen />}> </Route>
        <Route path='/editarPerfil' element={<EditarPerfil />}> </Route>
        <Route path='/admin/eliminarSucursal' element={<EliminarSucursal />}> </Route>
        <Route path='/perfilUsuario/intercambios' element={<GestionIntercambios />}></Route>
        <Route path='/perfilUsuario/agregarIntercambio' element={<AgregarIntercambio />}> </Route>
        <Route path='/perfilUsuario/eliminarIntercambio' element={<EliminarIntercambio />}> </Route>
        <Route path='/intercambios/:id' element={<ProductoIntercambio />}></Route>
      </Routes>
    </>
  )
}

export default App;
