// Punto de entrada: inicializa cada módulo del proyecto.
import { inicializarCarrito } from "./js/carrito.js";
import { inicializarFavoritos } from "./js/favoritos.js";
import { inicializarProductos } from "./js/productos.js";
import { inicializarFormulario } from "./js/formulario.js";
import { inicializarInterfaz } from "./js/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarCarrito();
  inicializarFavoritos();
  inicializarProductos();
  inicializarFormulario();
  inicializarInterfaz();
});
