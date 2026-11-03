import { leerLocalStorage, guardarLocalStorage } from "./helpers.js";
import { mostrarToast } from "./ui.js";

let favoritos = [];

export function esFavorito(id) {
  return favoritos.includes(id);
}

export function alternarFavorito(id) {
  if (esFavorito(id)) {
    favoritos = favoritos.filter((favoritoId) => favoritoId !== id);
    mostrarToast("Producto quitado de favoritos");
  } else {
    favoritos.push(id);
    mostrarToast("Producto guardado en favoritos 💗");
  }
  guardarLocalStorage("mundo-patitas-favoritos", favoritos);
}

export function obtenerFavoritos() {
  return [...favoritos];
}

export function inicializarFavoritos() {
  const guardados = leerLocalStorage("mundo-patitas-favoritos", []);
  favoritos = Array.isArray(guardados) ? guardados.filter((id) => Number.isInteger(id)) : [];
}
