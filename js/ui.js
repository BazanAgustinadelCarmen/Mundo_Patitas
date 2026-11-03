import { leerLocalStorage, guardarLocalStorage } from "./helpers.js";

export function mostrarToast(mensaje, tipo = "bien") {
  const contenedor = document.querySelector("#contenedor-toasts");
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  toast.textContent = mensaje;
  contenedor.append(toast);
  setTimeout(() => {
    toast.classList.add("saliendo");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 2500);
}

export function inicializarInterfaz() {
  const botonTema = document.querySelector("#boton-tema");
  const botonMenu = document.querySelector("#boton-menu");
  const navegacion = document.querySelector("#navegacion");
  const tema = leerLocalStorage("mundo-patitas-tema", "claro");

  if (tema === "oscuro") {
    document.body.classList.add("oscuro");
    botonTema.textContent = "☀️";
  }

  botonTema.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
    const nuevoTema = document.body.classList.contains("oscuro") ? "oscuro" : "claro";
    botonTema.textContent = nuevoTema === "oscuro" ? "☀️" : "🌙";
    guardarLocalStorage("mundo-patitas-tema", nuevoTema);
  });

  botonMenu.addEventListener("click", () => navegacion.classList.toggle("abierta"));
  navegacion.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) navegacion.classList.remove("abierta");
  });

  const enlaces = document.querySelectorAll(".enlace-nav");
  enlaces.forEach((enlace) => enlace.addEventListener("click", () => {
    enlaces.forEach((otro) => otro.classList.remove("activo"));
    enlace.classList.add("activo");
  }));
}
