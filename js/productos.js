import { productos } from "./datos.js";
import { formatearDinero, debounce } from "./helpers.js";
import { agregarAlCarrito } from "./carrito.js";
import { alternarFavorito, esFavorito, obtenerFavoritos } from "./favoritos.js";

let categoriaActiva = "todos";
let textoBusqueda = "";

function crearCardHTML(producto) {
  const favorito = esFavorito(producto.id);
  return `
    <article class="tarjeta">
      <div class="imagen">
        <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1583337130417-3346a1be7v?auto=format&fit=crop&w=700&q=80'">
        ${producto.etiqueta ? `<span class="etiqueta-producto">${producto.etiqueta}</span>` : ""}
        <button class="corazon ${favorito ? "marcado" : ""}" type="button" data-accion="favorito" data-id="${producto.id}" aria-label="Cambiar favorito">${favorito ? "♥" : "♡"}</button>
      </div>
      <div class="info">
        <small>${producto.categoria}</small><h3>${producto.nombre}</h3><p>${producto.descripcion}</p>
        <div class="pie-tarjeta"><div class="precio-producto"><small>Precio</small><b>${formatearDinero(producto.precio)}</b></div><button class="agregar" type="button" data-accion="agregar" data-id="${producto.id}">Agregar +</button></div>
      </div>
    </article>`;
}

function obtenerFiltrados() {
  return productos.filter((producto) => {
    const coincideCategoria = categoriaActiva === "todos" || producto.categoria === categoriaActiva;
    const texto = `${producto.nombre} ${producto.descripcion} ${producto.categoria}`.toLowerCase();
    return coincideCategoria && texto.includes(textoBusqueda);
  });
}

function renderizarCatalogo() {
  const filtrados = obtenerFiltrados();
  document.querySelector("#grilla-productos").innerHTML = filtrados.map(crearCardHTML).join("");
  document.querySelector("#sin-resultados").hidden = filtrados.length > 0;
  document.querySelector("#texto-resultados").textContent = `${filtrados.length} productos encontrados`;
}

function renderizarFavoritos() {
  const seleccionados = productos.filter((producto) => obtenerFavoritos().includes(producto.id));
  document.querySelector("#grilla-favoritos").innerHTML = seleccionados.map(crearCardHTML).join("");
  document.querySelector("#favoritos-vacios").hidden = seleccionados.length > 0;
  document.querySelector("#cantidad-favoritos-nav").textContent = seleccionados.length;
}

function manejarClick(evento) {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) return;
  const producto = productos.find((item) => item.id === Number(boton.dataset.id));
  if (!producto) return;
  if (boton.dataset.accion === "agregar") agregarAlCarrito(producto);
  if (boton.dataset.accion === "favorito") {
    alternarFavorito(producto.id);
    renderizarCatalogo();
    renderizarFavoritos();
  }
}

export function inicializarProductos() {
  const grilla = document.querySelector("#grilla-productos");
  const favoritos = document.querySelector("#grilla-favoritos");
  const filtros = document.querySelector("#filtros-categorias");
  const busqueda = document.querySelector("#busqueda");

  grilla.addEventListener("click", manejarClick);
  favoritos.addEventListener("click", manejarClick);

  filtros.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-categoria]");
    if (!boton) return;
    categoriaActiva = boton.dataset.categoria;
    filtros.querySelectorAll(".filtro").forEach((item) => item.classList.remove("activo"));
    boton.classList.add("activo");
    renderizarCatalogo();
  });

  busqueda.addEventListener("input", debounce((evento) => {
    textoBusqueda = evento.target.value.trim().toLowerCase();
    renderizarCatalogo();
  }, 300));

  document.querySelector("#limpiar-busqueda").addEventListener("click", () => {
    busqueda.value = "";
    textoBusqueda = "";
    renderizarCatalogo();
    busqueda.focus();
  });

  renderizarCatalogo();
  renderizarFavoritos();
}
