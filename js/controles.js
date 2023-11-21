import { settings } from "./main.js";

// ----------------------------------------------------------------------
//  EVENTOS Keydown / Keyup
// 
// ----------------------------------------------------------------------
const eventos_keyDown = document.addEventListener('keydown', (event) => {

    //console.log(event.key);
    const pulsacion = event.key;

    if (settings.estado.preJuego) {

        if (pulsacion === settings.tecla.enter) {
            settings.estado.preJuego = false;
            settings.estado.enJuego = true;
            settings.marcadores.botonNewGame.style.display = 'none';

            settings.msg.nivel = true;

            setTimeout(() => {
                settings.msg.nivel = false;
            }, settings.constante.pausaMsgNivelMostrar);

            settings.sonidos.musicaFondo.play();
            settings.sonidos.musicaFondo.volume = settings.volumen.musicaFondo;
        }

    } else if (settings.estado.gameOver) {

        if (pulsacion === settings.tecla.enter) {
            settings.estado.gameOver = false;
            settings.estado.preJuego = true;
            settings.marcadores.botonNewGame.style.display = 'none';
            rejugarNuevaPartida();
        }
    
    } else if (settings.estado.enJuego) {

        if (pulsacion === settings.tecla.iz) {
            //console.log('izq...');
            settings.controles.tecla_iz = true;
            
        } else if (pulsacion === settings.tecla.de) {
            //console.log('dcha...');
            settings.controles.tecla_de = true;

        } else if (pulsacion === settings.tecla.up) {
            //console.log('arriba/salto');
            settings.controles.tecla_up = true;

        } else if (pulsacion === settings.tecla.do) {
            //console.log('agachar');
            settings.controles.tecla_do = true;
        }

        if (pulsacion === settings.tecla.at[0] || pulsacion === settings.tecla.at[1]) {
            //console.log('atacar...');
            settings.controles.tecla_at = true;
        }
    }
});

// ----------------------------------------------------------------------
const eventos_keyUp = document.addEventListener('keyup', (event) => {

    if (settings.estado.enJuego) {

        if (event.key === settings.tecla.iz) {
            //console.log('endizq...');
            settings.controles.tecla_iz = false;
    
        } else if (event.key === settings.tecla.de) {
            //console.log('enddcha...');
            settings.controles.tecla_de = false;

        } else if (event.key === settings.tecla.up) {
            //console.log('endArriba/salto');
            settings.controles.tecla_up = false;

        } else if (event.key === settings.tecla.do) {
            //console.log('endAgachar');
            settings.controles.tecla_do = false;
        }

        if (event.key === settings.tecla.at[0] || event.key === settings.tecla.at[1]) {
            // console.log('endAtacar');
            settings.controles.tecla_at = false;
        }
    }
});

// ----------------------------------------------------------------------
//  EVENTOS touchstart / touchend
// 
// ----------------------------------------------------------------------
const eventos_touchStart = document.addEventListener('touchstart', (event) => {
    //console.log(event.target.id, event.targetTouches, event);
    const touch = event.target.id;

    if (settings.estado.preJuego) {

        if (touch === settings.touch.newGame) {
            settings.estado.preJuego = false;
            settings.estado.enJuego = true;
            settings.marcadores.botonNewGame.style.display = 'none';

            settings.msg.nivel = true;

            setTimeout(() => {
                settings.msg.nivel = false;
            }, settings.constante.pausaMsgNivelMostrar);
            
            settings.sonidos.musicaFondo.play();
            settings.sonidos.musicaFondo.volume = settings.volumen.musicaFondo;
        }
        
    } else if (settings.estado.gameOver) {

        if (touch === settings.touch.newGame) {
            settings.estado.gameOver = false;
            settings.estado.preJuego = true;
            settings.marcadores.botonNewGame.style.display = 'none';
            rejugarNuevaPartida();
        }
        
    } else if (settings.estado.enJuego) {

        if (touch === settings.touch.iz[0] || touch === settings.touch.iz[1]) {
            // console.log('izq...');
            settings.controles.touch_iz = true;
            
        } else if (touch === settings.touch.de[0] || touch === settings.touch.de[1]) {
            // console.log('dcha...');
            settings.controles.touch_de = true;
            
        } else if (touch === settings.touch.up[0] || touch === settings.touch.up[1]) {
            //console.log('arriba/saltar');
            settings.controles.touch_up = true;

        } else if (touch === settings.touch.do[0] || touch === settings.touch.do[1]) {
            //console.log('arriba/saltar');
            settings.controles.touch_do = true;
        }

        if (touch === settings.touch.at[0] || touch === settings.touch.at[1]) {
            //console.log('atacar...');
            settings.controles.touch_at = true;
        }
    }
    
    if (settings.estado.nivelSuperado) {

        if (touch === settings.touch.nextLevel) {
            settings.estado.nivelSuperado = false;
            settings.estado.enJuego = true;
            //acciones_comunes_nivelSuperado_ReiniciarPartida();
            settings.marcadores.botonNextLevel.style.display = 'none';
        }
    }
});

// ----------------------------------------------------------------------
const eventos_touchEnd = document.addEventListener('touchend', (event) => {

    //console.log(event.target.id, event.targetTouches);
    const touchEnd = event.target.id;

    if (settings.estado.enJuego) {

        if (touchEnd === settings.touch.iz[0] || touchEnd === settings.touch.iz[1]) {
            // console.log('endizq...');
            settings.controles.touch_iz = false;
    
        } else if (touchEnd === settings.touch.de[0] || touchEnd ===  settings.touch.de[1]) {
            // console.log('enddcha...');
            settings.controles.touch_de = false;

        } else if (touchEnd === settings.touch.up[0] || touchEnd ===  settings.touch.up[1]) {
            //console.log('endUp');
            settings.controles.touch_up = false;

        } else if (touchEnd === settings.touch.do[0] || touchEnd ===  settings.touch.do[1]) {
            //console.log('endUp');
            settings.controles.touch_do = false;
        }

        if (touchEnd === settings.touch.at[0] || touchEnd === settings.touch.at[1]) {
            // console.log('endAtacar');
            settings.controles.touch_at = false;
        }
    }
});

export {
    eventos_touchStart,
    eventos_touchEnd,
    eventos_keyDown,
    eventos_keyUp
};
