// Funciones reutilizables.
export function formatearDinero(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency", currency: "ARS", minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(Number(valor) || 0);
}

// Espera a que termine la escritura para ejecutar una búsqueda.
export function debounce(funcion, espera = 300) {
  let temporizador;
  return (...argumentos) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => funcion(...argumentos), espera);
  };
}

// Lee localStorage de forma segura por si el dato está dañado.
export function leerLocalStorage(clave, valorInicial) {
  try {
    const dato = localStorage.getItem(clave);
    return dato ? JSON.parse(dato) : valorInicial;
  } catch (error) {
    return valorInicial;
  }
}

export function guardarLocalStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    return false;
  }
  return true;
}
