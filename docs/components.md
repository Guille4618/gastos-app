# Componentes

## Layout
Estructura base de la app. Contiene el header con navegación entre
Inicio y Estadísticas. Recibe `children` como prop.

## GastoForm
Formulario controlado para añadir un gasto. Gestiona su propio estado
local con `useState` y llama a `agregarGasto` del contexto al enviar.

## GastoItem
Tarjeta individual de un gasto. Muestra nombre, categoría, fecha y
cantidad. Tiene un botón para eliminar que llama a `borrarGasto`.

## GastoList
Lista todos los gastos filtrados. Gestiona los tres estados de red:
cargando, error y datos. Muestra el total al final.

## FiltroBar
Barra de filtros por categoría y rango de fechas. Llama a `setFiltros`
del contexto cuando el usuario cambia algún filtro.

## Estadisticas
Página que muestra el total gastado y un desglose por categoría
con barras de progreso proporcionales al total.