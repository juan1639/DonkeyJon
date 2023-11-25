// ============================================================================
//  D O N K E Y J O N   ... By Juan Eguia
// 
// ----------------------------------------------------------------------------
import { Settings } from './settings.js';
import { Scroll } from './scroll.js';
import { Plataforma, PlataformaMovil } from './plataforma.js';
import { Escalera } from './Escalera.js';
import { Bichos } from './bichos.js';
import { Pajaros } from './pajaros.js';
import { Llave } from './llave.js';
import { Bonus } from './bonus.js';
import { LosSiete } from './lossiete.js';
import { Decorativos, DecorativosOffGame } from './decorativos.js';
import { Textos } from './textos.js';
import { ShowVidas } from './showvidas.js';
import { Boommerang } from './boommerang.js';
import { Jugador } from './Jugador.js';

// ----------------------------------------------------------------------------
import { 
    borraCanvas,
    check_gameOver
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
    const xIni = settings.ini_jugador.x;
    const yIni = settings.ini_jugador.y;
    console.log('Jugador coord:', xIni, yIni, ancho, alto, resX, resY);
    
    settings.objeto.jugador = new Jugador(xIni, yIni, ancho, alto);
    
    // ---------------------------------------------------------------
    settings.objeto.boommerang.push(new Boommerang('./img/boommerang_sheet.png', -100, -100, -1, -1));

    // ---------------------------------------------------------------
    const final = settings.array_plataformas.length - 1;

    for (let i = final; i >= 0; i --) {

        const p_y = settings.array_plataformas[i][0];
        const p_x = settings.array_plataformas[i][1];
        const p_ancho = settings.array_plataformas[i][2];
        const p_bordeIz = settings.array_plataformas[i][3];
        const p_bordeDe = settings.array_plataformas[i][4];
        const movil = settings.array_plataformas[i][5];

        if (movil === 0) {
            settings.objeto.plataforma.push(new Plataforma(p_y, p_x, p_ancho, './img/tile1.png', p_bordeIz, p_bordeDe));
            
        } else {
            settings.objeto.plataforma.push(new PlataformaMovil(p_y, p_x, p_ancho, './img/tile6.png', movil, movil));
        }
    }
    
    // ---------------------------------------------------------------
    for (let escalera of settings.array_escaleras) {

        const e_x = escalera[0];
        const e_y = escalera[1];
        const e_size = escalera[2];

        settings.objeto.escalera.push(new Escalera(e_x, e_y, e_size));
    }

    // ---------------------------------------------------------------
    const nivel = settings.marcadores.nivel - 1;
    
    for (let i = 0; i < settings.nro_enemigos.mariq[nivel]; i ++) {

        const id = Math.floor(Math.random()* settings.constante.nro_bichos);

        settings.objeto.bichos.push(new Bichos(id));
    }

    // ---------------------------------------------------------------    
    for (let i = 0; i < settings.nro_enemigos.pajaros[nivel]; i ++) {

        const posIniY = 0;

        settings.objeto.pajaros.push(new Pajaros(i, posIniY));
    }

    // ---------------------------------------------------------------
    for (let i of settings.array_decorativos) {
        const decX = i[0] * settings.constante.bsx;
        const accion = i[4]; // interactuable true/false
        console.log('dec:', decX, i[3], i[1], i[2], i[4]);

        settings.objeto.decorativos.push(new Decorativos(i[3], decX, i[1], i[2], accion));
    }

    // ---------------------------------------------------------------
    let i = settings.array_decorativosOffgame[0];
    const id_dOff = i[2];
    const rx = Math.floor(i[0]);
    const ry = Math.floor(i[1]);

    settings.objeto.decorativosOffgame.push(new DecorativosOffGame(id_dOff, rx, ry, i[3], i[4]));

    // ---------------------------------------------------------------
    for (let txt of settings.array_textos) {
        const alin = txt[1];
        const size = txt[2];
        const color = txt[3];

        settings.objeto.textos.push(new Textos(txt[0], alin, size, color));
    }
    
    // ---------------------------------------------------------------
    const id_llave = './img/keyYellow.png';
    const llx = 29 * settings.constante.bsx;
    const lly = settings.ini_suelo - settings.gap * 3;

    settings.objeto.llave = new Llave(id_llave, llx, lly, true);

    // ---------------------------------------------------------------
    for (let bonus of settings.array_bonus) {
        const idBonus = bonus[0];
        const bonX = bonus[1] * settings.constante.bsx;
        const bonY = bonus[2];

        settings.objeto.bonus.push(new Bonus(idBonus, bonX, bonY, true));
    }

    // ---------------------------------------------------------------
    for (let i = 0; i < settings.constante.nro_DIAMANTES; i ++) {

        settings.objeto.lossiete.push(new LosSiete(i, settings.constante.bsx * i, 0));
    }

    // ---------------------------------------------------------------
    for (let i = settings.marcadores.vidas; i > 0; i --) {
        const idVidas = './img/Ssheet_jugador.png';
        const xVidas = settings.resolucion[0] - i * settings.constante.bsx - settings.constante.bsx;

        settings.objeto.showvidas.push(new ShowVidas(idVidas, xVidas, 0, settings.constante.bsx, settings.constante.bsy));
    }
    
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
