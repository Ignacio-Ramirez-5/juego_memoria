let matrizSolucion = [
    [1, 2, 3, 4], 
    [1, 2, 3, 4], 
    [5, 5, 6, 6]  
];

let matrizUsuario = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0]  
];

let imagenes = document.querySelectorAll("img");
let contador = document.querySelector("#intentos");

let imagen_seleccionada = []; // Almacena las dos imágenes seleccionadas por el usuario para compararlas.
let intentos = 5; 
let frutas = 0;   


// Función para mostrar la imagen antes de taparla de nuevo si es incorrecta.
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// Recorremos todas las imágenes del tablero y les añadimos un evento "click" para cuando el usuario haga clic.
imagenes.forEach(imagen => {
    imagen.addEventListener("click", async () => {

        let imagen_coordenadas = imagen.id;

        // Dividimos el ID para obtener la fila y columna de la imagen dentro de la matriz.
        let coordenada = imagen_coordenadas.split(",");
        let imagen_resuelta = matrizSolucion[coordenada[0]][coordenada[1]];

        // Añadimos la imagen seleccionada a la lista de imágenes seleccionadas por el usuario.
        imagen_seleccionada.push({numeros: imagen_resuelta, img: imagen});

        imagen.src = "./img/" + imagen_resuelta + ".jpg";

        if (imagen_seleccionada.length == 2) {
            if (imagen_seleccionada[0].numeros == imagen_seleccionada[1].numeros) {
                frutas++;
            } else {
                await sleep(1000);
                imagen_seleccionada[0].img.src = "./img/0.jpg"; 
                imagen_seleccionada[1].img.src = "./img/0.jpg"; 
                intentos--; 
            }
            // Limpiamos la lista de imágenes seleccionadas para la siguiente ronda.
            imagen_seleccionada = [];
        }

        // Actualizamos el contador de intentos en la pantalla.
        contador.textContent = intentos;

        if (intentos == 0) {
            location.reload(); // Recarga la página (reinicia el juego).
            alert("HAS PERDIDO");
        }

        if (frutas == 6) {
            location.reload(); // Recarga la página (reinicia el juego).
            alert("HAS GANADO");
        }

    });
});
