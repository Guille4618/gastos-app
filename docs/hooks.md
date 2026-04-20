# Hooks

## useState
Usado en `GastoForm` para gestionar el estado del formulario y en
`GastosContext` para almacenar la lista de gastos, el estado de
carga y los errores.

## useEffect
Usado en `GastosContext` para cargar los gastos del servidor al
montar el componente por primera vez.

## useContext
Usado a través del hook personalizado `useGastos` para consumir
el contexto desde cualquier componente.

## useGastos (custom hook)
Hook personalizado que encapsula `useContext(GastosContext)` y
lanza un error si se usa fuera del Provider. Simplifica el consumo
del contexto en los componentes.