// ============================================================================
//  D O N K E Y J O N   ... By Juan Eguia
// 
// ----------------------------------------------------------------------------
import { Settings } from './settings.js';
import { Scroll } from './scroll.js';
import { Plataforma } from './plataforma.js';
import { Escalera } from './Escalera.js';
import { Bichos } from './bichos.js';
import { Jugador } from './Jugador.js';

// ----------------------------------------------------------------------------
import { 
    eventos_touchStart,
    eventos_touchEnd,
    eventos_click,
    eventos_keyDown,
    eventos_keyUp
} from "./controles.js";
 
// ----------------------------------------------------------------------------
import { 
    borraCanvas
} from "./functions.js";

// ----------------------------------------------------------------------------
const escalas_validas = [1, 2, 3, 4];
let escalaSel = 1;
let settings;
let dxdy = [0, 0];

// ===========================================================================
//  Funcion Inicializadora
// ---------------------------------------------------------------------------
window.onload = () => {

    settings = new Settings(escalaSel);

    const resX = settings.resolucion[0];
    const resY = settings.resolucion[1];

    settings.canvas.width = resX;
    settings.canvas.height = resY;
    settings.ctx.scale(settings.escala.x, settings.escala.y);

    // ---------------------------------------------------------------
    for (let scroll of settings.ini_scrolls) {
        const s_x = scroll[0];
        const s_y = scroll[1];
        const s_img = scroll[2];

        settings.objeto.scroll.push(new Scroll(s_x, s_y, resX, resY, s_img));
    }
    
    // ---------------------------------------------------------------
    const ancho = settings.constante.ancho_jugador;
    const alto = settings.constante.alto_jugador;
    const xIni = settings.ini_jugador.x * settings.constante.bsx - Math.floor(ancho / 2);
    const yIni = settings.ini_jugador.y * settings.constante.bsy;
    console.log('Jugador coord:', xIni, yIni, ancho, alto, resX, resY);

    settings.objeto.jugador = new Jugador(xIni, yIni, ancho, alto);

    // ---------------------------------------------------------------
    const final = settings.array_plataformas.length - 1;

    for (let i = final; i >= 0; i --) {

        const p_y = settings.array_plataformas[i][0];
        const p_x = settings.array_plataformas[i][1];
        const p_ancho = settings.array_plataformas[i][2];
        const p_bordeIz = settings.array_plataformas[i][3];
        const p_bordeDe = settings.array_plataformas[i][4];

        settings.objeto.plataforma.push(new Plataforma(p_y, p_x, p_ancho, './img/tile1.png', p_bordeIz, p_bordeDe));
    }
    
    // ---------------------------------------------------------------
    for (let escalera of settings.array_escaleras) {

        const e_x = escalera[0];
        const e_y = escalera[1];
        const e_size = escalera[2];

        settings.objeto.escalera.push(new Escalera(e_x, e_y, e_size));
    }

    // ---------------------------------------------------------------
    settings.objeto.bichos.push(new Bichos());

    // ---------------------------------------------------------------
    setInterval(() => {
        bucle_principal();
    }, 1000 / settings.constante.FPS);
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

    settings.objeto.bichos[0].dibuja(dxdy);

    dxdy = settings.objeto.jugador.dibuja();
}

export { settings };
