import { settings } from "./main.js";

let eventos_touch;
let eventos_click;

// ----------------------------------------------------------------------
//  EVENTOS Keydown / Keyup
// 
// ----------------------------------------------------------------------
const eventos_keyDown = document.addEventListener('keydown', (event) => {

    console.log(event.key);
    const pulsacion = event.key;

    if (settings.estado.preJuego) {

        if (pulsacion === settings.tecla.enter) {
            settings.estado.preJuego = false;
            settings.estado.enJuego = true;
            settings.marcadores.botonNewGame.style.display = 'none';
        }

    } else if (settings.estado.gameOver) {

        if (pulsacion === settings.tecla.enter) {
            settings.estado.gameOver = false;
            settings.estado.preJuego = true;
            marcadores.botonNewGame.style.display = 'none';
            rejugarNuevaPartida();
        }
    
    } else if (settings.estado.enJuego) {

        if (pulsacion === settings.tecla.iz) {
            console.log('izq...');
            settings.controles.tecla_iz = true;
            
        } else if (pulsacion === settings.tecla.de) {
            console.log('dcha...');
            settings.controles.tecla_de = true;

        } else {
            console.log('...');
        }
    }
});

const eventos_keyUp = document.addEventListener('keyup', (event) => {

    if (settings.estado.enJuego) {

        if (event.key === settings.tecla.iz) {
            console.log('endizq...');
            settings.controles.tecla_iz = false;
    
        } else if (event.key === settings.tecla.de) {
            console.log('enddcha...');
            settings.controles.tecla_de = false;
        } else {
            console.log('... ..');
        }
    }
});

export {
    eventos_touch,
    eventos_click,
    eventos_keyDown,
    eventos_keyUp
};
