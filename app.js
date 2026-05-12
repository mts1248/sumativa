const form = document.getElementById("formulario");
const lista = document.getElementById("lista");
const btnLimpiar = document.getElementById("limpiar");
const buscador = document.getElementById("buscar");

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// EVENTOS
form.addEventListener("submit", guardarCliente);
btnLimpiar.addEventListener("click", limpiarFormulario);
buscador.addEventListener("input", filtrarClientes);

// INICIALIZAR
renderClientes();

// FUNCIONES
function guardarCliente(e) {
    e.preventDefault();

    const cliente = obtenerDatos();

    if (!validar(cliente)) return;

    clientes.push(cliente);
    guardarStorage();

    renderClientes();
    limpiarFormulario();
    animacionExito();
}

function obtenerDatos() {
    return {
        rut: document.getElementById("rut").value.trim(),
        nombre: document.getElementById("nombre").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        telefono: document.getElementById("telefono").value.trim()
    };
}

function validar(cliente) {
    if (!cliente.rut || !cliente.nombre || !cliente.telefono) {
        mostrarMensaje("Completa los campos ⚠️", true);
        return false;
    }

    if (!validarRUT(cliente.rut)) {
        mostrarMensaje("RUT inválido ❌", true);
        return false;
    }

    return true;
}

// VALIDACIÓN RUT SIMPLE
function validarRUT(rut) {
    return /^[0-9]+-[0-9kK]{1}$/.test(rut);
}

function renderClientes(filtro = "") {
    lista.innerHTML = "";

    clientes
        .filter(c => 
            c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            c.rut.includes(filtro)
        )
        .forEach((c, index) => {
            const li = document.createElement("li");

            const texto = document.createElement("span");
            texto.textContent = `${c.rut} - ${c.nombre}`;

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "❌";

            btnEliminar.addEventListener("click", () => {
                eliminarCliente(index);
            });

            li.appendChild(texto);
            li.appendChild(btnEliminar);

            lista.appendChild(li);
        });
}

function filtrarClientes(e) {
    renderClientes(e.target.value);
}

function eliminarCliente(index) {
    clientes.splice(index, 1);
    guardarStorage();
    renderClientes();
    mostrarMensaje("Cliente eliminado ❌");
}

function limpiarFormulario() {
    form.reset();
}

function guardarStorage() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

// MENSAJES
function mostrarMensaje(texto, error = false) {
    const msg = document.createElement("div");
    msg.textContent = texto;

    msg.style.position = "fixed";
    msg.style.bottom = "20px";
    msg.style.right = "20px";
    msg.style.padding = "10px 15px";
    msg.style.borderRadius = "10px";
    msg.style.color = "white";
    msg.style.zIndex = "1000";

    msg.style.background = error ? "#d50000" : "#00c853";

    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 2500);
}

// 🎉 ANIMACIÓN DE ÉXITO GRANDE
function animacionExito() {
    const exito = document.createElement("div");
    exito.textContent = "✔";

    exito.style.position = "fixed";
    exito.style.top = "50%";
    exito.style.left = "50%";
    exito.style.transform = "translate(-50%, -50%) scale(0)";
    exito.style.fontSize = "100px";
    exito.style.color = "#00e676";
    exito.style.zIndex = "2000";
    exito.style.transition = "0.4s";

    document.body.appendChild(exito);

    setTimeout(() => {
        exito.style.transform = "translate(-50%, -50%) scale(1)";
    }, 50);

    setTimeout(() => {
        exito.remove();
    }, 800);
}