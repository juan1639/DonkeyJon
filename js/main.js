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
    // ---------------------------------------------------------------
    /* let i = settings.array_decorativosOffgame[0];
    const id_dOff = i[2];
    const rx = Math.floor(i[0]);
    const ry = Math.floor(i[1]);

    settings.objeto.decorativosOffgame.push(new DecorativosOffGame(id_dOff, rx, ry, i[3], i[4])); */

    // ---------------------------------------------------------------
    instanciar_plataformas(0);
    instanciar_escaleras(0);
    instanciar_decorativos(0);
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

    for (let scroll of settings.objeto.scroll) {
        scroll.dibuja(dxdy);
    }
    
    for (let plataforma of settings.objeto.plataforma) {
        plataforma.dibuja(dxdy);
    }

    for (let escalera of settings.objeto.escalera) {
        escalera.dibuja(dxdy);
    }

    for (let bicho of settings.objeto.bichos) {
        bicho.dibuja(dxdy);
    }

    for (let pajaro of settings.objeto.pajaros) {
        pajaro.dibuja(dxdy);
    }

    for (let bon of settings.objeto.bonus) {
        bon.dibuja(dxdy);
    }

    dxdy = settings.objeto.jugador.dibuja();

    for (let boommerang of settings.objeto.boommerang) {
        boommerang.dibuja(dxdy);
    }
    
    for (let decor of settings.objeto.decorativos) {
        decor.dibuja(dxdy);
    }

    for (let los7 of settings.objeto.lossiete) {
        los7.dibuja();
    }

    for (let showb of settings.objeto.showbonus) {
        showb.dibuja(dxdy);
    }

    for (let showvida of settings.objeto.showvidas) {
        showvida.dibuja();
    }

    for (let chispa of settings.objeto.chispa) {
        if (chispa) chispa.dibuja(dxdy);
    }

    for (let texto of settings.objeto.textos) {
        texto.dibuja(dxdy);
    }

    settings.objeto.llave.dibuja(dxdy);

    for (let decorOff of settings.objeto.decorativosOffgame) {
        decorOff.dibuja(dxdy);
    }

    check_gameOver();
}

export { settings };
