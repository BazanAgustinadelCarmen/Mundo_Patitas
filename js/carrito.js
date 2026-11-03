import { leerLocalStorage, guardarLocalStorage, formatearDinero } from "./helpers.js";
import { mostrarToast } from "./ui.js";

let carrito = [];

function guardarCarrito() {
  guardarLocalStorage("mundo-patitas-carrito", carrito);
}

function actualizarResumen() {
  const cantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  const subtotal = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  const iva = subtotal * 0.21;
  document.querySelector("#cantidad-carrito-nav").textContent = cantidad;
  document.querySelector("#subtotal").textContent = formatearDinero(subtotal);
  document.querySelector("#iva").textContent = formatearDinero(iva);
  document.querySelector("#total").textContent = formatearDinero(subtotal + iva);
  document.querySelector("#carrito-vacio").hidden = carrito.length > 0;
  document.querySelector("#resumen-carrito").hidden = carrito.length === 0;
}

function renderizarCarrito() {
  const lista = document.querySelector("#lista-carrito");
  lista.innerHTML = carrito.map((producto) => `
    <article class="item-carrito">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="detalle"><h3>${producto.nombre}</h3><p>${formatearDinero(producto.precio)} por unidad</p><b>${formatearDinero(producto.precio * producto.cantidad)}</b></div>
      <div class="cantidad">
        <button type="button" data-accion="disminuir" data-id="${producto.id}">−</button>
        <span>${producto.cantidad}</span>
        <button type="button" data-accion="aumentar" data-id="${producto.id}">+</button>
      </div>
      <button class="quitar" type="button" data-accion="eliminar" data-id="${producto.id}" aria-label="Eliminar producto">×</button>
    </article>
  `).join("");
  actualizarResumen();
}

export function agregarAlCarrito(producto) {
  const existente = carrito.find((item) => item.id === producto.id);
  if (existente) existente.cantidad += 1;
  else carrito.push({ ...producto, cantidad: 1 });
  guardarCarrito();
  renderizarCarrito();
  mostrarToast(`${producto.nombre} se agregó al carrito`);
}

function manejarAcciones(evento) {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) return;
  const id = Number(boton.dataset.id);
  const producto = carrito.find((item) => item.id === id);
  if (!producto) return;

  if (boton.dataset.accion === "aumentar") producto.cantidad += 1;
  if (boton.dataset.accion === "disminuir") producto.cantidad -= 1;
  if (boton.dataset.accion === "eliminar" || producto.cantidad <= 0) {
    carrito = carrito.filter((item) => item.id !== id);
    mostrarToast("Producto quitado del carrito");
  }
  guardarCarrito();
  renderizarCarrito();
}

export function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
}

export function obtenerCantidadCarrito() {
  return carrito.reduce((total, producto) => total + producto.cantidad, 0);
}

export function inicializarCarrito() {
  const guardado = leerLocalStorage("mundo-patitas-carrito", []);
  carrito = Array.isArray(guardado) ? guardado.filter((item) =>
    item && Number.isInteger(item.id) && Number.isFinite(item.precio) &&
    Number.isInteger(item.cantidad) && item.cantidad > 0
  ) : [];
  document.querySelector("#lista-carrito").addEventListener("click", manejarAcciones);
  document.querySelector("#vaciar-carrito").addEventListener("click", () => {
    if (carrito.length > 0) {
      vaciarCarrito();
      mostrarToast("El carrito quedó vacío");
    }
  });
  renderizarCarrito();
}
