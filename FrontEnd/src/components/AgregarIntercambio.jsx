import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import axios from "axios";

export const AgregarIntercambio = () => {
    const navigate = useNavigate();
    const { role } = useUser();
    const [sucursales, setSucursales] = useState([]);
    const [sucursal, setSucursal] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [fotos, setFotos] = useState([null, null]);
    const [categoria, setCategoria] = useState('');
    const [horarioInicio, setHorarioInicio] = useState(null);
    const [horarioFin, setHorarioFin] = useState(null);
    const [imgs, setImgs] = useState(null);
    const refTitulo = useRef(null);
    const refDescripcion = useRef(null);
    const refFotos = useRef(null);
    const refCategoria = useRef(null);
    const refSucursal = useRef(null);
    const refHorariosI = useRef(null);
    const refHorariosF = useRef(null);
    const refHorariosP = useRef(null);
    const refMensaje = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            publicarIntercambio();
        }
    };

    useEffect(() => {
        fetch('http://localhost:8000/api/sucursales')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    //Cloudinary
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    async function uploadSingleImage(base64) {
        axios
            .post("http://localhost:8000/SubirImagen", { imaage: base64 })
            .then((res) => {
                let email = localStorage.getItem("email")
                fetch("http://localhost:8000/api/users/" + email)
                    .then((usuario) => usuario.json())
                    .then((u) => {
                        Post(res.data, u);
                    })
            })
            .catch(console.log);
    }

    function uploadMultipleImages(images) {
        axios
            .post("http://localhost:8000/uploadMultipleImages", { images })
            .then((res) => {
                let email = localStorage.getItem("email")
                fetch("http://localhost:8000/api/users/" + email)
                    .then((usuario) => usuario.json())
                    .then((u) => {
                        PostMultiple(res.data, u);
                    })
            })
            .catch(console.log);
    }

    const uploadImage = async (f) => {
        const files = f;
        if (files.length === 0) {
            Post("");
        } else if (files.length === 1 || files[1] === null || files[0] === null) {
            let base64;
            if (files[1] === null) {
                base64 = await convertBase64(files[0]);
            }
            else {
                base64 = await convertBase64(files[1]);
            }
            uploadSingleImage(base64);
            return;
        }
        const base64s = [];
        for (var i = 0; i < files.length; i++) {
            var base = await convertBase64(files[i]);
            base64s.push(base);
        }
        uploadMultipleImages(base64s);
    };

    async function Post(imgs, usuario) {
        let nombre = sucursal.nombre + ' ';
        const res = await fetch("http://localhost:8000/api/prodIntercambios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                fotos: imgs.public_id,
                categoria: categoria,
                sucursal: sucursal._id,
                inicioRango: horarioInicio,
                finRango: horarioFin,
                idUsuario: localStorage.getItem("email"),
                nombre: usuario.name,
                apellido: usuario.lastname,
                urlFotos: imgs.secure_url,
                nombreSucursal: nombre
            })
        });
    }

    async function PostMultiple(imgs, usuario) {
        const res = await fetch("http://localhost:8000/api/prodIntercambios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                fotos: [imgs[0].public_id, imgs[1].public_id],
                categoria: categoria,
                sucursal: sucursal._id,
                inicioRango: horarioInicio,
                finRango: horarioFin,
                idUsuario: localStorage.getItem("email"),
                nombre: usuario.name,
                apellido: usuario.lastname,
                urlFotos: [imgs[0].secure_url, imgs[1].secure_url],
                nombreSucursal: sucursal.nombre
            })
        });
    }
    const redirectGestion = () => navigate('/perfilUsuario/intercambios');

    const seleccionarSucursal = (event) => {
        const idSeleccionada = event.target.value;
        setSucursal(sucursales.find(s => s._id === idSeleccionada));
    }

    const seleccionarFotos = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width > 800 || img.height > 600) {
                        setMensaje('La imagen debe ser de tamaño máximo 800x600 píxeles.');
                        refFotos.current.style.color = 'red';
                        e.target.value = "";
                    } else {
                        const newFiles = [...fotos];
                        newFiles[index] = file;
                        setFotos(newFiles);
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            const newFiles = [...fotos];
            newFiles[index] = null;
            setFotos(newFiles);
        }
    };

    const chequeo = () => {
        [refTitulo, refDescripcion, refFotos, refCategoria, refSucursal, refHorariosI, refHorariosF, refHorariosP].forEach(ref => ref.current.style.color = '');
        setMensaje('');
        if (!titulo) {
            setMensaje('Por favor, ingrese un título.');
            refTitulo.current.style.color = 'red';
            return false;
        }
        if (!descripcion) {
            setMensaje('Por favor, ingrese una descripción.');
            refDescripcion.current.style.color = 'red';
            return false;
        }
        if (!fotos[0] && !fotos[1]) {
            setMensaje('Por favor, suba por lo menos 1 foto.');
            refFotos.current.style.color = 'red';
            return false;
        }
        if (!categoria) {
            setMensaje('Por favor, selecciona una categoría.');
            refCategoria.current.style.color = 'red';
            return false;
        }
        if (!sucursal) {
            setMensaje('Por favor, seleccione una sucursal.');
            refSucursal.current.style.color = 'red';
            return false;
        }
        if (!horarioInicio) {
            setMensaje('Por favor, seleccione un horario de inicio.');
            refHorariosI.current.style.color = 'red';
            return false;
        }
        if (!horarioFin) {
            setMensaje('Por favor, seleccione un horario de fin.');
            refHorariosF.current.style.color = 'red';
            return false;
        }
        if (horarioInicio > horarioFin) {
            setMensaje('Por favor, ingrese un horario válido.');
            refHorariosI.current.style.color = 'red';
            refHorariosF.current.style.color = 'red';
            return false;
        }
        const horaA = new Date(sucursal.horarioApertura);
        const horaC = new Date(sucursal.horarioCierre);
        const horarioI = new Date('1970-01-01T' + horarioInicio);
        const horarioF = new Date('1970-01-01T' + horarioFin);
        if (horarioI < horaA || horarioF > horaC) {
            setMensaje('Los horarios seleccionados no corresponden a los de la sucursal elegida.');
            refHorariosI.current.style.color = 'red';
            refHorariosF.current.style.color = 'red';
            refHorariosP.current.style.color = 'red';
            return false;
        }
        return true;
    }
    const publicarIntercambio = async () => {
        if (chequeo()) {
            try {
                await uploadImage(fotos);
                setMensaje('¡Producto para intercambiar subido correctamente!');
                refMensaje.current.style.color = '#07f717';
            } catch (error) {
                console.error("Error:", error);
                setMensaje('Hubo un error al cargar el producto.');
                refMensaje.current.style.color = 'red';
            }
        }
    }

    return (
        <>
            {role === 'cliente' ?
                <div className='formularioIntercambio' onKeyDown={handleKeyDown}>
                    <h2 style={{ color: "#242465" }}> Agregar producto para intercambiar </h2>
                    <p> ¡Agregá un producto que ya no uses y esté juntando polvo en tu casa para intercambiar con otro que necesites!</p>

                    <div className="mb-3">
                        <label htmlFor="tituloIntercambio" ref={refTitulo}> Título del producto: </label>
                        <input type="text" className="form-control" id='tituloIntercambio' placeholder='Tornillos con poco uso' value={titulo} onChange={e => setTitulo(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcionIntercambio" ref={refDescripcion}> Descripción del producto: </label>
                        <input type="text" className="form-control" id='descripcionIntercambio' placeholder='Intercambio tornillos de 22 cm. marca CAT con muy poco uso.' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fotosIntercambio" ref={refFotos}> Fotos del producto: </label>
                        <p> Podés agregar hasta 2 fotos de 800x600.</p>
                        <input type="file" className="form-control" id='fotosIntercambio' accept="image/*" onChange={(e) => seleccionarFotos(0, e)} />
                        <input type="file" className="form-control" accept="image/*" onChange={(e) => seleccionarFotos(1, e)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoria" ref={refCategoria}> Categoría del producto: </label>
                        <select className="form-select" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option value="" disabled selected> Seleccione categoría...</option>
                            <option key="categoria1" value="Construcción"> Construcción </option>
                            <option key="categoria2" value="Madera"> Madera </option>
                            <option key="categoria3" value="Electricidad"> Electricidad </option>
                            <option key="categoria4" value="Herramientas"> Herramientas </option>
                            <option key="categoria5" value="Baño"> Baño </option>
                            <option key="categoria6" value="Cocina"> Cocina </option>
                            <option key="categoria7" value="Jardín"> Jardín </option>
                            <option key="categoria8" value="Ferretería"> Ferretería </option>
                            <option key="categoria9" value="Pintura"> Pintura </option>
                            <option key="categoria10" value="Decoración"> Decoración </option>
                            <option key="categoria11" value="Mobiliario"> Mobiliario </option>
                            <option key="categoria12" value="Climatización"> Climatización </option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="sucursalIntercambio" ref={refSucursal}> Sucursal del intercambio: </label>
                        <select name="sucursalI" id="sucursalIntercambio" className='form-select' onChange={seleccionarSucursal}>
                            <option value="" disabled selected> Seleccione sucursal...</option>
                            {sucursales.map((sucursal) => (
                                <option key={sucursal._id} value={sucursal._id}> {sucursal.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="horarioInicioIntercambio" ref={refHorariosI}> Horario de inicio para intercambiar: </label>
                        <input type="time" className="form-control" id='horarioInicioIntercambio' value={horarioInicio} onChange={(e) => setHorarioInicio(e.target.value)} />
                    </div>

                    <p ref={refHorariosP}> Recordá que el horario debe estar en el rango donde la sucursal elegida esté abierta.</p>

                    <div className="mb-3">
                        <label htmlFor="horarioFinIntercambio" ref={refHorariosF}> Horario de fin para intercambiar: </label>
                        <input type="time" className="form-control" id='horarioFinIntercambio' value={horarioFin} onChange={(e) => setHorarioFin(e.target.value)} />
                    </div>

                    <button className="btn btn-success" onClick={publicarIntercambio}> Publicar intercambio</button>
                    <p className='errorContainer' ref={refMensaje}> {mensaje} </p>
                    <p className="textoRedireccion" onClick={redirectGestion}> Volver a la gestión de intercambios</p>
                </div>
                : <Mantenimiento></Mantenimiento>}
        </>
    )
}
