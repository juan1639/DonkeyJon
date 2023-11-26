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
    instanciar_plataformas,
    instanciar_escaleras,
    instanciar_decorativos,
    instanciar_bonus,
    instanciar_llave,
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
    
    instanciar_plataformas(0);
    instanciar_escaleras(0);
    instanciar_decorativos(0);
    instanciar_bonus(0);
    instanciar_llave(0);

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
