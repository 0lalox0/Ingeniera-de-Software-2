import './App.css'
import { HeaderFerreplus } from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { FormularioLogin } from './components/FormularioLogin'
import { FormularioRegistro } from './components/FormularioRegistro'
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
import { AgregarEmpleado } from './components/AgregarEmpleado'
import { EliminarEmpleado } from './components/EliminarEmpleado'
import { AsignarSucursal } from './components/AsignarSucursal'
import { ListarEmpleados } from './components/ListarEmpleados'
import { ElegirProducto } from './components/ElegirProducto'
import { ListarPropuestas } from './components/ListarPropuestas'
import { PerfilEmpleado } from './components/PerfilEmpleado'
import { GestionPropuestasAceptadas } from './components/GestionPropuestasAceptadas'
import { GestionEstadisticas } from './components/GestionEstadisticas'
import { EstadisticasSucursales } from './components/EstadisticasSucursales'
import { EstadisticasCategorias } from './components/EstadisticasCategorias'
import { EstadisticasEmpleados } from './components/EstadisticasEmpleados'
import { Contacto } from './components/Contacto'
import { Soporte } from './components/Soporte'
import { Terminos } from './components/Terminos'

function App() {

  return (
    <>
      <HeaderFerreplus></HeaderFerreplus>
      <Routes>
        <Route path='/' element={<Intercambios />}></Route>
        <Route path='/inicioSesion' element={<FormularioLogin />}></Route>
        <Route path='/registrarse' element={<FormularioRegistro />}></Route>
        <Route path='/cambiocontra' element={<CambioContra />}></Route>
        <Route path='/cambiocontrasinemail' element={<CambioContraSinEmail />}></Route>
        <Route path='/sucursales' element={<Sucursales />}> </Route>
        <Route path='/intercambios' element={<Intercambios />}> </Route>
        <Route path='/admin' element={<Admin />}> </Route>
        <Route path='/admin/sucursales' element={<GestionSucursales />}> </Route>
        <Route path='/admin/agregarSucursal' element={<AgregarSucursal />}></Route>
        <Route path='/admin/empleados' element={<GestionEmpleados />}> </Route>
        <Route path='/admin/agregarEmpleado' element={<AgregarEmpleado />}> </Route>
        <Route path='/admin/eliminarEmpleado' element={<EliminarEmpleado />}> </Route>
        <Route path='/admin/asignarSucursal' element={<AsignarSucursal />}> </Route>
        <Route path='/admin/listarEmpleados' element={<ListarEmpleados />}> </Route>
        <Route path='/admin/eliminarSucursal' element={<EliminarSucursal />}> </Route>
        <Route path='/admin/estadisticas' element={<GestionEstadisticas />}> </Route>
        <Route path='/admin/estadisticasSucursales' element={<EstadisticasSucursales />}> </Route>
        <Route path='/admin/estadisticasCategorias' element={<EstadisticasCategorias />}> </Route>
        <Route path='/admin/estadisticasEmpleados' element={<EstadisticasEmpleados />}> </Route>
        <Route path='/SubirImagen' element={<SubirImagen />}> </Route>
        <Route path='/editarPerfil' element={<EditarPerfil />}> </Route>
        <Route path='/perfilUsuario' element={<PerfilUsuario />}> </Route>
        <Route path='/perfilUsuario/intercambios' element={<GestionIntercambios />}></Route>
        <Route path='/perfilUsuario/agregarIntercambio' element={<AgregarIntercambio />}> </Route>
        <Route path='/perfilUsuario/eliminarIntercambio' element={<EliminarIntercambio />}> </Route>
        <Route path='/perfilUsuario/propuestas' element={<ListarPropuestas />}></Route>
        <Route path='/intercambios/:id' element={<ProductoIntercambio />}></Route>
        <Route path='/elegiProducto/:id' element={<ElegirProducto />}></Route>
        <Route path='/perfilEmpleado' element={<PerfilEmpleado />}> </Route>
        <Route path='/perfilEmpleado/propuestas' element={<GestionPropuestasAceptadas />}> </Route>
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/soporte' element={<Soporte />} />
        <Route path='/terminos' element={<Terminos />} />
      </Routes>
    </>
  )
}

export default App;
