# API REST

Base URL: `http://localhost:3000/api/v1`

## Endpoints

### GET /gastos
Devuelve todos los gastos.
**Respuesta:**
```json
{ "exito": true, "datos": [...] }
```

### POST /gastos
Crea un nuevo gasto.
**Body:**
```json
{ "nombre": "string", "cantidad": 0, "categoria": "string", "fecha": "string" }
```

### PUT /gastos/:id
Edita un gasto existente.

### DELETE /gastos/:id
Elimina un gasto por su ID.