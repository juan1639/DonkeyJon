// ============================================================================
//  D O N K E Y J O N   ... By Juan Eguia
// 
// ----------------------------------------------------------------------------
import { Settings } from './settings.js';
import { Scroll } from './scroll.js';
import { Jugador } from './Jugador.js';

// ----------------------------------------------------------------------------
import { 
    eventos_touch,
    eventos_click,
    eventos_key
} from "./controles.js";
 
// ----------------------------------------------------------------------------
import { 
    borraCanvas
} from "./functions.js";

// ----------------------------------------------------------------------------
const escalas_validas = [1, 2, 3, 4];
let escalaSel = 1;
let settings;

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

    settings.objeto.scroll.push(new Scroll(0, 0, resX, resY, './img/fondo_cielo1.png'));

    settings.objeto.jugador = new Jugador(settings.constante.xIni_jugador, settings.constante.yIni_jugador);

    setInterval(() => {
        bucle_principal();
    }, 1000 / settings.constante.FPS);
}

// ===================================================================
function bucle_principal() {

    borraCanvas();

    settings.objeto.scroll[0].dibuja();

    settings.objeto.jugador.dibuja();
}

export { settings };
