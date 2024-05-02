import { useState } from 'react'
import './App.css'
import { HeaderFerreplus } from './components/HeaderFerreplus'
import { Route, Routes } from 'react-router-dom'
import { FormularioLogin } from './components/FormularioLogin'
import { FormularioRegistro } from './components/FormularioRegistro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeaderFerreplus></HeaderFerreplus>
      <Routes>
        <Route path='/inicioSesion' element={<FormularioLogin> </FormularioLogin>}></Route>
        <Route path='/registrarse' element={<FormularioRegistro> </FormularioRegistro>}></Route>
      </Routes>
    </>
  )
}

export default App;
