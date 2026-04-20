# Context API

## GastosContext
Contexto global que almacena y comparte el estado de los gastos
entre todos los componentes de la app.

## GastosProvider
Componente que envuelve la app y provee el contexto. Contiene
la lógica de carga, creación, edición y eliminación de gastos.

## ¿Cuándo usar Context API?
Context es útil cuando varios componentes en distintos niveles
del árbol necesitan acceder al mismo estado. En este caso, tanto
GastoForm, GastoList, FiltroBar como Estadisticas necesitan
acceder a los gastos, por lo que Context evita pasar props
por múltiples niveles (prop drilling).