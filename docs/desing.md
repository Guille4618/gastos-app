# Arquitectura de la aplicación

## Estructura de componentes
- `Layout` — estructura base con header y navegación
- `GastoForm` — formulario para añadir un gasto
- `GastoList` — lista de todos los gastos
- `GastoItem` — tarjeta individual de un gasto
- `Estadisticas` — resumen de gastos por categoría
- `FiltroBar` — barra de filtros por categoría y fecha

## Gestión del estado
El estado global se gestiona con Context API:
- `GastosContext` — almacena la lista de gastos y las funciones
  para añadir, editar y eliminar

## Diseño del backend (API REST)

### Endpoints
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/v1/gastos | Obtener todos los gastos |
| POST | /api/v1/gastos | Crear un nuevo gasto |
| PUT | /api/v1/gastos/:id | Editar un gasto |
| DELETE | /api/v1/gastos/:id | Eliminar un gasto |

### Ejemplo de respuesta GET /api/v1/gastos
```json
{
  "exito": true,
  "datos": [
    {
      "id": "1",
      "nombre": "Supermercado",
      "cantidad": 45.50,
      "categoria": "Alimentación",
      "fecha": "2024-04-20"
    }
  ]
}
```

## Flujo de datos
Frontend (React) → fetch → API REST (Express) → datos en memoria

## Decisiones de arquitectura
- Se usa Context API en lugar de Redux porque la app es pequeña
- El backend guarda los datos en memoria para simplificar el desarrollo
- Los tipos del frontend y backend están alineados mediante interfaces
  compartidas en `src/types/`