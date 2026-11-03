# Mundo Patitas 🐾

**Rubro:** catálogo de productos y accesorios para mascotas.

Proyecto final individual de Laboratorio de Programación (2.º año), realizado con HTML, CSS y JavaScript puro. No utiliza frameworks ni librerías de JavaScript.

## Funcionalidades
- Catálogo de 10 productos en un array de objetos dentro de `js/datos.js`, cada uno con imagen, descripción, categoría y precio en pesos argentinos (ARS).
- Tarjetas generadas dinámicamente con `map()` y template strings.
- Filtros por cuatro categorías y búsqueda con `debounce`.
- Mensaje de “no encontramos productos” si no hay coincidencias.
- Navegación por secciones: Inicio, Productos, Mis favoritos, Mi carrito y Contacto.
- Carrito: agregar, aumentar, disminuir, eliminar y vaciar.
- Subtotal, IVA del 21%, total y contador de unidades.
- Persistencia de carrito, favoritos y modo oscuro con `localStorage`.
- Manejo seguro de datos guardados mediante `try/catch`.
- Notificaciones toast.
- Formulario con validación de nombre, correo, teléfono y dirección.
- Spinner y confirmación simulada con `Promise` y `setTimeout`.
- Diseño responsive para computadora y celular.

## Cómo ejecutarlo
1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar o habilitar la extensión **Live Server**.
3. Hacer clic derecho en `index.html` y elegir **Open with Live Server**.
4. Se abrirá el sitio en el navegador.

Se debe usar Live Server porque el proyecto utiliza módulos JavaScript (`import` y `export`).

## Carpetas
```text
Mundo_Patitas/
├── index.html
├── main.js
├── README.md
├── css/
│   └── estilos.css
├── img/
└── js/
    ├── datos.js
    ├── helpers.js
    ├── ui.js
    ├── productos.js
    ├── carrito.js
    ├── favoritos.js
    └── formulario.js
```

**Aclaración:** es una demostración académica. El formulario simula la confirmación; no procesa pagos ni envía datos a un servidor real. Las imágenes se cargan desde enlaces externos, por lo que se necesita conexión a internet para verlas.


## Precios e imágenes
Los importes cargados en `js/datos.js` son valores de ejemplo para la presentación del proyecto y se pueden modificar. Cada tarjeta muestra la fotografía, el nombre y el precio en pesos argentinos. Las imágenes se descargan desde Unsplash y requieren conexión a internet.
