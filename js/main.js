// ============================================================================
//  D O N K E Y J O N   ... By Juan Eguia
// 
// ----------------------------------------------------------------------------
import { Settings } from './settings.js';

// ----------------------------------------------------------------------------
import {
    instanciar_scrolls,
    instanciar_jugador,
    instanciar_boommerang,
    instanciar_bichos,
    instanciar_pajaros,
    instanciar_textos,
    instanciar_plataformas,
    instanciar_escaleras,
    instanciar_decorativos,
    instanciar_decorativosOffgame,
    instanciar_bonus,
    instanciar_llave,
    instanciar_los7,
    instanciar_showVidas,
    borraCanvas,
    check_gameOver,
    playSonidosLoop
} from "./functions.js";

// ----------------------------------------------------------------------------
import { 
    eventos_touchStart,
    eventos_touchEnd,
    eventos_keyDown,
    eventos_keyUp,
    eventos_click
} from "./controles.js";

// ----------------------------------------------------------------------------
const escalas_validas = [1, 2, 3, 4];
let escalaSel = 1;
let settings;
let dxdy = [0, 0];

// ===========================================================================
//  Funcion Inicializadora
// 
// ---------------------------------------------------------------------------
window.onload = () => {

    settings = new Settings(escalaSel);

    // --------------------------------------------------------------------
    settings.marcadores.botonSelectMusica.addEventListener('click', () => {

        const opciones = [settings.constante.txt_selectMusica, 'Musica: Off'];

        if (settings.marcadores.botonSelectMusica.innerHTML === opciones[0]) {
            settings.marcadores.botonSelectMusica.innerHTML = opciones[1];
            settings.constante.musica = false;
            
        } else {
            settings.marcadores.botonSelectMusica.innerHTML = opciones[0];
            settings.constante.musica = true;
        }
        
        playSonidosLoop(settings.sonidos.dieThrow1, false, 0.9);
        playSonidosLoop(settings.sonidos.chips1, false, 0.9);
    });

    settings.marcadores.botonSelectDificultad.addEventListener('click', () => {
        
        const opciones = [
            'Dificultad: Fácil',
            settings.constante.txt_selectDificultad,
            'Dificultad: Difícil'
        ];

        if (settings.marcadores.botonSelectDificultad.innerHTML === opciones[0]) {
            settings.marcadores.botonSelectDificultad.innerHTML = opciones[1];
            settings.constante.dificultad = 1;
            
        } else if (settings.marcadores.botonSelectDificultad.innerHTML === opciones[1]) {
            settings.marcadores.botonSelectDificultad.innerHTML = opciones[2];
            settings.constante.dificultad = 2;
            
        } else if (settings.marcadores.botonSelectDificultad.innerHTML === opciones[2]) {
            settings.marcadores.botonSelectDificultad.innerHTML = opciones[0];
            settings.constante.dificultad = 0;
        }

        playSonidosLoop(settings.sonidos.dieThrow2, false, 0.9);
        playSonidosLoop(settings.sonidos.chips3, false, 0.9);
    });
    
    settings.marcadores.botonNewGame.addEventListener('click', () => {
        
        playSonidosLoop(settings.sonidos.dieThrow1, false, 0.9);
        playSonidosLoop(settings.sonidos.chips2, false, 0.9);
        comenzar_instancias();
    });
}

// ===========================================================================
//  Instancias
// ---------------------------------------------------------------------------
function comenzar_instancias() {

    settings.marcadores.menuPrincipal.style.display = 'none';
    settings.canvas.style.display = 'flex';

    const resX = settings.resolucion[0];
    const resY = settings.resolucion[1];

    settings.canvas.width = resX;
    settings.canvas.height = resY;
    settings.ctx.scale(settings.escala.x, settings.escala.y);

    // ---------------------------------------------------------------
    instanciar_scrolls();
    instanciar_jugador();
    instanciar_boommerang();
    instanciar_bichos();
    instanciar_pajaros();

    instanciar_plataformas(0);
    instanciar_escaleras(0);
    instanciar_decorativos(0);
    //instanciar_decorativosOffgame(0);
    instanciar_bonus(0);
    instanciar_llave(0);

    instanciar_textos();
    instanciar_los7();
    instanciar_showVidas();

    // ---------------------------------------------------------------
    setInterval(() => {
        bucle_principal();
    }, 1000 / settings.constante.FPS);

    setTimeout(() => {
        comenzar_partida();
    }, 999);
}

// ====================================================================
function comenzar_partida() {
    
    settings.estado.preJuego = false;
    settings.estado.enJuego = true;
    // settings.objeto.decorativosOffgame.pop();

    settings.msg.nivel = true;
    
    setTimeout(() => {
        settings.msg.nivel = false;
    }, settings.constante.pausaMsgNivelMostrar);

    if (settings.constante.musica) {
        settings.sonidos.musicaFondo.play();
        settings.sonidos.musicaFondo.loop = true;
        settings.sonidos.musicaFondo.volume = settings.volumen.musicaFondo;
    }
}

// ===================================================================
function bucle_principal() {

    borraCanvas();

    const keyObjs = Object.keys(settings.objeto);

    for (let objeto of keyObjs) {

        if (objeto === 'jugador') {
            dxdy = settings.objeto[objeto].dibuja();

        } else if (objeto === 'lossiete' || objeto === 'showvidas') {
            for (let noArg of settings.objeto[objeto]) {
                noArg.dibuja();
            }
        
        } else if (objeto === 'llave') {
            settings.objeto[objeto].dibuja(dxdy);

        } else {
            for (let arg of settings.objeto[objeto]) {
                arg.dibuja(dxdy);
            }
        }
    }
    
    check_gameOver();
}

export { settings };
