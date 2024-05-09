import useUser from "../hooks/useUser";

export const Productos = () => {
    const productos = [
        { id: 1, nombre: 'Producto 1', precio: 100 },
        { id: 2, nombre: 'Producto 2', precio: 200 },
        { id: 3, nombre: 'Producto 3', precio: 300 },
        // Agrega más productos aquí
    ];

    const { user, isLoading } = useUser();

    return (
        <div>
            <div className="titulo-productos">
                <h1 style={{ color: "#242465" }} >Productos de Ferreplus</h1>
            </div>
            <div className="productos-intercambio">
                <ul>
                    {productos.map((producto) => (
                        <li key={producto.id}>
                            {producto.nombre} - ${producto.precio}
                            {user
                                ? <button>Comprar</button>
                                : <button>Login para comprar</button>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}