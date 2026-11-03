import { vaciarCarrito, obtenerCantidadCarrito } from "./carrito.js";
import { mostrarToast } from "./ui.js";

function validarNombre(valor) {
  return valor.trim().length >= 3 ? "" : "Ingresá tu nombre y apellido (mínimo 3 caracteres).";
}
function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()) ? "" : "Ingresá un correo válido.";
}
function validarTelefono(valor) {
  return valor.replace(/\D/g, "").length >= 8 ? "" : "Ingresá un teléfono de al menos 8 números.";
}
function validarDireccion(valor) {
  return valor.trim().length >= 5 ? "" : "Ingresá una dirección más completa.";
}

function mostrarError(campo, mensaje) {
  document.querySelector(`#error-${campo}`).textContent = mensaje;
  document.querySelector(`#${campo}`).classList.toggle("invalido", mensaje !== "");
}

function validarFormulario() {
  const errores = {
    nombre: validarNombre(document.querySelector("#nombre").value),
    email: validarEmail(document.querySelector("#email").value),
    telefono: validarTelefono(document.querySelector("#telefono").value),
    direccion: validarDireccion(document.querySelector("#direccion").value)
  };
  Object.keys(errores).forEach((campo) => mostrarError(campo, errores[campo]));
  return Object.values(errores).every((error) => error === "");
}

// Simulación de una respuesta de servidor usando Promise y setTimeout.
function enviarPedido(datos) {
  return new Promise((resolver) => {
    setTimeout(() => resolver({ correcto: true, nombre: datos.nombre }), 1300);
  });
}

export function inicializarFormulario() {
  const formulario = document.querySelector("#formulario-pedido");
  const boton = document.querySelector("#boton-confirmar");
  const cargando = document.querySelector("#cargando");
  const mensajeExito = document.querySelector("#mensaje-exito");
  const mensaje = document.querySelector("#mensaje");
  const contador = document.querySelector("#contador-mensaje");

  mensaje.addEventListener("input", () => contador.textContent = `${mensaje.value.length}/180`);

  ["nombre", "email", "telefono", "direccion"].forEach((id) => {
    document.querySelector(`#${id}`).addEventListener("input", () => {
      document.querySelector(`#${id}`).classList.remove("invalido");
      document.querySelector(`#error-${id}`).textContent = "";
    });
  });

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mensajeExito.hidden = true;
    if (obtenerCantidadCarrito() === 0) {
      mostrarToast("Primero agregá algún producto al carrito", "aviso");
      document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!validarFormulario()) return;

    const datos = {
      nombre: document.querySelector("#nombre").value.trim(),
      email: document.querySelector("#email").value.trim(),
      telefono: document.querySelector("#telefono").value.trim(),
      direccion: document.querySelector("#direccion").value.trim(),
      mensaje: mensaje.value.trim()
    };

    boton.disabled = true;
    cargando.hidden = false;
    try {
      const respuesta = await enviarPedido(datos);
      if (respuesta.correcto) {
        vaciarCarrito();
        formulario.reset();
        contador.textContent = "0/180";
        mensajeExito.textContent = `¡Gracias, ${respuesta.nombre}! Tu pedido de demostración fue registrado.`;
        mensajeExito.hidden = false;
        mostrarToast("¡Pedido confirmado! 💗");
      }
    } catch (error) {
      mostrarToast("No se pudo procesar el pedido. Intentá nuevamente.", "aviso");
    } finally {
      cargando.hidden = true;
      boton.disabled = false;
    }
  });
}
