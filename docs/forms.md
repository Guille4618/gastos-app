# Formularios

## GastoForm
Formulario controlado con los siguientes campos:
- `nombre` — texto libre
- `cantidad` — número decimal
- `categoria` — selector con categorías predefinidas
- `fecha` — selector de fecha

Cada campo actualiza el estado local con `useState` mediante
`onChange`. Al enviar se valida que el nombre no esté vacío
y que la cantidad sea mayor que 0.